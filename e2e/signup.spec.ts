import { test, expect } from '@playwright/test';

test.describe('회원가입 페이지', () => {
  test('회원가입 페이지 로드 확인', async ({ page }) => {
    await page.goto('/signup');
    await expect(page).toHaveURL('http://localhost:3000/signup');
  });

  test('로고 클릭 시 랜딩페이지로 이동한다.', async ({ page }) => {
    await page.goto('/signup');
    await page.getByAltText('로고').click();
    await expect(page).toHaveURL('http://localhost:3000');
  });

  test('로그인하기 텍스트 클릭 시 로그인 페이지로 이동한다.', async ({ page }) => {
    await page.goto('/signup');
    await page.getByRole('link', { name: '로그인하기' }).click();
    await expect(page).toHaveURL('http://localhost:3000/login');
  });

  test('중복된 이메일을 제출하면, alert 창으로 메시지를 표시하며, 확인 버튼을 누르면 모달이 닫힌다.', async ({ page }) => {
    await page.goto('/signup');
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input').fill('test@email.com');
    await page.getByTestId('password-input').fill('password1!');
    await page.getByTestId('password-confirm-input').fill('password1!');
    await page.getByTestId('nickname-input').fill('nickname1234');
    await page.getByTestId('signup-button').click();

    await expect(page.getByText('이미 사용중인 이메일입니다.')).toBeVisible();
    await page.getByRole('button', { name: '확인' }).click();
    await expect(page.getByText('이미 사용중인 이메일입니다.')).toBeHidden();
  });

  test('중복된 닉네임을 제출하면, alert 창으로 메시지를 표시하며, 확인 버튼을 누르면 모달이 닫힌다.', async ({ page }) => {
    await page.goto('/signup');
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input').fill('testEE555@email.com');
    await page.getByTestId('password-input').fill('password1!');
    await page.getByTestId('password-confirm-input').fill('password1!');
    await page.getByTestId('nickname-input').fill('nickname1234');
    await page.getByTestId('signup-button').click();

    await expect(page.getByText('중복된 닉네임입니다.')).toBeVisible();
    await page.getByRole('button', { name: '확인' }).click();
    await expect(page.getByText('중복된 닉네임입니다.')).toBeHidden();
  });

  test('카카오 로그인 실패 시 쿼리 스트링과 함께 로그인 페이지로 리다이렉트 된다.', async ({ page }) => {
    await page.goto('/signup');

    await page.getByAltText('카카오 소셜 로그인').click();

    expect(page.url()).toContain('accounts.kakao.com/login');

    await page.goto('/oauth/signup/kakao?error=access-denied');
    await expect(page).toHaveURL(/\/login\?error=/);

    const url = new URL(page.url());
    const errorMessage = url.searchParams.get('error');
    expect(errorMessage).toBeTruthy();
  });

  test('구글 로그인 실패 시 쿼리 스트링과 함께 로그인 페이지로 리다이렉트 된다.', async ({ page }) => {
    await page.goto('/signup');

    await page.getByAltText('구글 소셜 로그인').click();

    expect(page.url()).toContain('accounts.google.com');

    await page.goto('/oauth/signup/google?error=access-denied');
    await expect(page).toHaveURL(/\/login\?error=/);

    const url = new URL(page.url());
    const errorMessage = url.searchParams.get('error');
    expect(errorMessage).toBeTruthy();
  });

  test('카카오 로그인에 성공하면 랜딩페이지로 리다이렉트 된다.', async ({ page }) => {
    await page.goto('/signup');
    await page.getByAltText('구글 소셜 로그인').click();
    await page.evaluate(() => {
      window.location.href = 'http://localhost:3000';
    });
    await page.waitForURL('http://localhost:3000', { timeout: 10000 });
    await expect(page).toHaveURL('http://localhost:3000');
  });

  test('구글 로그인에 성공하면 랜딩페이지로 리다이렉트 된다.', async ({ page }) => {
    await page.goto('/signup');
    await page.getByAltText('구글 소셜 로그인').click();
    await page.evaluate(() => {
      window.location.href = 'http://localhost:3000';
    });
    await page.waitForURL('http://localhost:3000', { timeout: 10000 });
    await expect(page).toHaveURL('http://localhost:3000');
  });
  test('이메일과 닉네임이 중복되지 않은 걸 제출하면, 회원가입 성공 메시지를 표시하며, 확인 버튼을 누르면 랜딩 페이지로 이동한다.', async ({ page }) => {
    await page.route('**/api/auth/signUp', (route) => {
      route.fulfill({
        status: 201,
        body: JSON.stringify({
          user: {
            image: null,
            updatedAt: 'string',
            createdAt: 'string',
            nickname: 'string',
            id: 0,
          },
        }),
      });
    });

    await page.goto('/signup');
    await page.waitForTimeout(1000);

    await page.getByTestId('email-input').fill('successTest@email.com');
    await page.getByTestId('password-input').fill('password1!');
    await page.getByTestId('password-confirm-input').fill('password1!');
    await page.getByTestId('nickname-input').fill('successNickname');

    const responsePromise = page.waitForResponse((response) => response.url().includes('/api/auth/signUp'));

    await page.getByRole('button', { name: '가입하기' }).click();
    await responsePromise;

    await expect(page.getByText('회원가입이 완료되었습니다!')).toBeVisible();
    await page.getByRole('button', { name: '확인' }).click();
    await expect(page).toHaveURL('http://localhost:3000');
  });

  test('로그인이 되어있으면, 랜딩 페이지로 리다이렉트 된다.', async ({ browser }) => {
    const context = await browser.newContext();
    await context.addCookies([
      {
        name: 'accessToken',
        value: 'testHeader.testPayload,testSignature',
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
      },
      {
        name: 'refreshToken',
        value: 'testHeader.testPayload,testSignature',
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
      },
    ]);

    const loggedInPage = await context.newPage();
    await loggedInPage.goto('/signup');

    await expect(loggedInPage).toHaveURL('http://localhost:3000');
    await context.close();
  });
});

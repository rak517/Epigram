import { test, expect } from '@playwright/test';

test.describe('로그인 페이지', () => {
  test('로그인 페이지 로드 확인', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL('http://localhost:3000/login');
  });

  test('로고 클릭 시 랜딩페이지로 이동한다.', async ({ page }) => {
    await page.goto('/login');
    await page.getByAltText('로고').click();
    await expect(page).toHaveURL('http://localhost:3000');
  });

  test('가입하기 텍스트 클릭 시 로그인 페이지로 이동한다.', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('link', { name: '가입하기' }).click();
    await expect(page).toHaveURL('http://localhost:3000/signup');
  });

  test('가입되지 않은 이메일로 로그인을 시도하면, alert 모달이 렌더링된다.', async ({ page }) => {
    await page.goto('/login');
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input-login').fill('testFFFFFF@email.com');
    await page.getByTestId('password-input-login').fill('password1!');
    await page.getByRole('button', { name: '로그인' }).click();

    await expect(page.getByText('존재하지 않는 이메일입니다.')).toBeVisible();
    await page.getByRole('button', { name: '확인' }).click();
    await expect(page.getByText('존재하지 않는 이메일입니다.')).toBeHidden();
  });

  test('일치하지 않는 비밀번호로 로그인을 시도하면, alert 모달이 렌더링된다.', async ({ page }) => {
    await page.goto('/login');
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input-login').fill('test5@email.com');
    await page.getByTestId('password-input-login').fill('password');
    await page.getByRole('button', { name: '로그인' }).click();

    await expect(page.getByText('비밀번호가 일치하지 않습니다.')).toBeVisible();
    await page.getByRole('button', { name: '확인' }).click();
    await expect(page.getByText('비밀번호가 일치하지 않습니다.')).toBeHidden();
  });

  test('카카오 로그인 실패 시 쿼리 스트링과 함께 로그인 페이지로 리다이렉트 되며, alert 모달이 렌더링된다.', async ({ page }) => {
    await page.goto('/login');

    await page.getByAltText('카카오 소셜 로그인').click();

    expect(page.url()).toContain('accounts.kakao.com/login');

    await page.goto('/oauth/signup/kakao?error=access-denied');
    await expect(page).toHaveURL(/\/login\?error=/);

    const url = new URL(page.url());
    const errorMessage = url.searchParams.get('error') ?? '';
    await expect(page.getByText(errorMessage)).toBeVisible();
  });

  test('구글 로그인 실패 시 쿼리 스트링과 함께 로그인 페이지로 리다이렉트 되며, alert 모달이 렌더링된다.', async ({ page }) => {
    await page.goto('/login');

    await page.getByAltText('구글 소셜 로그인').click();

    expect(page.url()).toContain('accounts.google.com');

    await page.goto('/oauth/signup/google?error=access-denied');
    await expect(page).toHaveURL(/\/login\?error=/);

    const url = new URL(page.url());
    const errorMessage = url.searchParams.get('error') ?? '';
    await expect(page.getByText(errorMessage)).toBeVisible();
  });

  test('카카오 로그인에 성공하면 랜딩페이지로 리다이렉트 된다.', async ({ page }) => {
    await page.goto('/login');
    await page.getByAltText('카카오 소셜 로그인').click();
    await page.evaluate(() => {
      window.location.href = 'http://localhost:3000';
    });
    await page.waitForURL('http://localhost:3000', { timeout: 10000 });
    await expect(page).toHaveURL('http://localhost:3000');
  });

  test('구글 로그인에 성공하면 랜딩페이지로 리다이렉트 된다.', async ({ page }) => {
    await page.goto('/login');
    await page.getByAltText('구글 소셜 로그인').click();
    await page.evaluate(() => {
      window.location.href = 'http://localhost:3000';
    });
    await page.waitForURL('http://localhost:3000', { timeout: 10000 });
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
    await loggedInPage.goto('/login');
    await expect(loggedInPage).toHaveURL('http://localhost:3000');
    await context.close();
  });

  test('로그인에 성공하면 로그인 성공 메시지를 표시하며, 확인 버튼을 누르면 랜딩페이지로 이동한다.', async ({ page }) => {
    await page.goto('/login');
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input-login').fill('test5@email.com');
    await page.getByTestId('password-input-login').fill('password1!');
    await page.getByRole('button', { name: '로그인' }).click();

    await expect(page.getByText('로그인에 성공했습니다!')).toBeVisible();
    await page.getByRole('button', { name: '확인' }).click();
    await expect(page.getByText('로그인에 성공했습니다!')).toBeHidden();
  });
});

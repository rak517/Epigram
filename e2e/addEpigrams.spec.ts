import { test, expect } from '@playwright/test';

test.describe('에픽그램 만들기', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login', {
      waitUntil: 'networkidle',
    });

    await page.fill('input[name="email"]', 'e2eTest@test.com');
    await page.fill('input[name="password"]', 'e2etest123@');

    await page.click('button:text("로그인")');

    await page.waitForSelector('button:text("확인")');
    await page.click('button:text("확인")');

    await page.waitForTimeout(3000);

    await expect(page).toHaveURL('http://localhost:3000/');

    const cookies = await page.context().cookies();
    const accessTokenCookie = cookies.find((cookie) => cookie.name === 'accessToken');

    if (!accessTokenCookie) {
      throw new Error('로그인 실패: accessToken을 받을 수 없습니다.');
    }

    const accessToken = accessTokenCookie.value;

    await page.context().addCookies([
      {
        name: 'accessToken',
        value: accessToken,
        path: '/',
        domain: 'localhost',
        httpOnly: true,
        secure: false,
      },
    ]);

    await page.goto('http://localhost:3000/addepigram', {
      waitUntil: 'networkidle',
    });

    await expect(page).toHaveURL('http://localhost:3000/addepigram');
  });

  test('본문 내용이 입력된다.', async ({ page }) => {
    await page.fill('textarea[name="content"]', '테스트내용');
    await expect(page.locator('textarea[name="content"]')).toHaveValue('테스트내용');
  });

  test('저자 이름이 입력된다.', async ({ page }) => {
    await page.click('label[for="custom"]');
    await page.fill('input[name="author"]', '테스트이름');
    await expect(page.locator('input[name="author"]')).toHaveValue('테스트이름');
  });

  test('출처 제목이 입력된다.', async ({ page }) => {
    await page.fill('input[name="referenceTitle"]', '테스트출처');
    await expect(page.locator('input[name="referenceTitle"]')).toHaveValue('테스트출처');
  });

  test('URL이 입력된다.', async ({ page }) => {
    await page.fill('input[name="referenceUrl"]', 'https://www.naver.com');
    await expect(page.locator('input[name="referenceUrl"]')).toHaveValue('https://www.naver.com');
  });

  test('태그가 입력된다.', async ({ page }) => {
    await page.fill('input[placeholder="입력하여 태그 작성 (최대 10자)"]', '테스트태그');
    await expect(page.locator('input[placeholder="입력하여 태그 작성 (최대 10자)"]')).toHaveValue('테스트태그');
  });

  test('태그 추가 버튼이 클릭된다.', async ({ page }) => {
    await page.fill('input[placeholder="입력하여 태그 작성 (최대 10자)"]', '테스트태그');
    await page.click('button:has-text("추가")');
    const buttonText = await page.locator('button:has-text("추가")').textContent();
    await expect(buttonText).toBe('추가');
  });

  test('작성 완료 버튼이 활성화된다.', async ({ page }) => {
    await page.fill('textarea[name="content"]', '테스트내용');
    await page.click('label[for="custom"]');
    await page.fill('input[name="author"]', '테스트이름');
    await page.fill('input[name="referenceTitle"]', '테스트출처');
    await page.fill('input[name="referenceUrl"]', 'https://www.naver.com');
    await page.fill('input[placeholder="입력하여 태그 작성 (최대 10자)"]', '테스트태그');
    await page.fill('input[placeholder="입력하여 태그 작성 (최대 10자)"]', '테스트태그');
    await page.click('button:has-text("추가")');

    const submitButton = page.locator('button[type="submit"]');
    const isEnabled = await submitButton.isEnabled();
    console.log('Submit Button Enabled:', isEnabled);
    await expect(isEnabled).toBe(true);
  });

  test('작성 완료 버튼 클릭 후 상세 페이지로 이동한다.', async ({ page }) => {
    await page.fill('textarea[name="content"]', '테스트내용');
    await page.click('label[for="custom"]');
    await page.fill('input[name="author"]', '테스트이름');
    await page.fill('input[name="referenceTitle"]', '테스트출처');
    await page.fill('input[name="referenceUrl"]', 'https://www.naver.com');
    await page.fill('input[placeholder="입력하여 태그 작성 (최대 10자)"]', '테스트태그');
    await page.click('button:has-text("추가")');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/\/epigrams\/\d+/);
  });

  test('작성 완료 버튼 클릭 후 상세 페이지로 이동하고, 에디트 페이지에서 내용 비교', async ({ page }) => {
    await page.fill('textarea[name="content"]', '테스트내용');
    await page.click('label[for="custom"]');
    await page.fill('input[name="author"]', '테스트이름');
    await page.fill('input[name="referenceTitle"]', '테스트출처');
    await page.fill('input[name="referenceUrl"]', 'https://www.naver.com');
    await page.fill('input[placeholder="입력하여 태그 작성 (최대 10자)"]', '테스트태그');
    await page.click('button:has-text("추가")');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/\/epigrams\/\d+/);

    const epigramId = page.url().split('/').pop();

    await page.goto(`http://localhost:3000/epigrams/${epigramId}/edit`, { waitUntil: 'networkidle' });
    console.log(epigramId);

    await expect(page.locator('textarea[name="content"]')).toHaveValue('테스트내용');
    await expect(page.locator('input[name="author"]')).toHaveValue('테스트이름');
    await expect(page.locator('input[name="referenceTitle"]')).toHaveValue('테스트출처');
    await expect(page.locator('input[name="referenceUrl"]')).toHaveValue('https://www.naver.com');
    await expect(page.locator('span:has-text("테스트태그")')).toBeVisible();
  });
});

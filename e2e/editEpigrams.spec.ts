import { test, expect } from '@playwright/test';

test.describe('에픽그램 수정하기', () => {
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

  test('작성 후 수정 페이지에서 수정하고, 상세 페이지에서 비교', async ({ page }) => {
    const originalContent = '테스트내용';
    const originalAuthor = '테스트이름';
    const originalReferenceTitle = '테스트출처';
    const originalReferenceUrl = 'https://www.naver.com';
    const originalTag = '테스트태그';

    await page.fill('textarea[name="content"]', originalContent);
    await page.click('label[for="custom"]');
    await page.fill('input[name="author"]', originalAuthor);
    await page.fill('input[name="referenceTitle"]', originalReferenceTitle);
    await page.fill('input[name="referenceUrl"]', originalReferenceUrl);
    await page.fill('input[placeholder="입력하여 태그 작성 (최대 10자)"]', originalTag);
    await page.click('button:has-text("추가")');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/\/epigrams\/\d+/);

    const epigramId = page.url().split('/').pop();

    await page.goto(`http://localhost:3000/epigrams/${epigramId}/edit`, { waitUntil: 'networkidle' });

    const updatedContent = '수정된 테스트내용';
    const updatedAuthor = '수정된 테스트이름';
    const updatedReferenceTitle = '수정된 테스트출처';
    const updatedReferenceUrl = 'https://www.google.com';

    await page.fill('textarea[name="content"]', updatedContent);
    await page.fill('input[name="author"]', updatedAuthor);
    await page.fill('input[name="referenceTitle"]', updatedReferenceTitle);
    await page.fill('input[name="referenceUrl"]', updatedReferenceUrl);
    await page.fill('input[placeholder="입력하여 태그 작성 (최대 10자)"]', '태그추가');
    await page.click('button:has-text("추가")');

    const updateSubmitButton = page.locator('button[type="submit"]');
    await updateSubmitButton.click();

    const modalConfirmButton = page.locator('button:has-text("확인")');
    await modalConfirmButton.waitFor({ state: 'visible' });

    await modalConfirmButton.click();

    await page.waitForTimeout(3000);

    await page.goto(`http://localhost:3000/epigrams/${epigramId}/edit`, { waitUntil: 'networkidle' });

    await expect(page.locator('textarea[name="content"]')).toHaveValue(updatedContent);
    await expect(page.locator('input[name="author"]')).toHaveValue(updatedAuthor);
    await expect(page.locator('input[name="referenceTitle"]')).toHaveValue(updatedReferenceTitle);
    await expect(page.locator('input[name="referenceUrl"]')).toHaveValue(updatedReferenceUrl);
    await expect(page.locator('span:has-text("테스트태그")')).toBeVisible();
    await expect(page.locator('span:has-text("태그추가")')).toBeVisible();
  });
});

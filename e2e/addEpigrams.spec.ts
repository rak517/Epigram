import { test, expect } from '@playwright/test';
import { navigateToAddEpigramPage } from '@/utils/navigate/navigateToAddEpigramPage';

test.describe('에픽그램 만들기', () => {
  // 1. 페이지 이동
  test('페이지가 addepigram으로 이동한다.', async ({ page }) => {
    await navigateToAddEpigramPage(page);
  });

  // 2. 내용 입력 (본문)
  test('본문 내용이 입력된다.', async ({ page }) => {
    await navigateToAddEpigramPage(page);
    await page.fill('textarea[name="content"]', '테스트내용');
    await expect(page.locator('textarea[name="content"]')).toHaveValue('테스트내용');
  });

  // 3. 저자 이름 입력
  test('저자 이름이 입력된다.', async ({ page }) => {
    await navigateToAddEpigramPage(page);
    await page.click('label[for="custom"]');
    await page.fill('input[name="authorName"]', '테스트이름');
    await expect(page.locator('input[name="authorName"]')).toHaveValue('테스트이름');
  });

  // 4. 출처 제목 입력
  test('출처 제목이 입력된다.', async ({ page }) => {
    await navigateToAddEpigramPage(page);
    await page.fill('input[name="sourceTitle"]', '테스트출처');
    await expect(page.locator('input[name="sourceTitle"]')).toHaveValue('테스트출처');
  });

  // 5. URL 입력
  test('URL이 입력된다.', async ({ page }) => {
    await navigateToAddEpigramPage(page);
    await page.fill('input[name="sourceUrl"]', 'http://www.naver.com');
    await expect(page.locator('input[name="sourceUrl"]')).toHaveValue('http://www.naver.com');
  });

  // 6. 태그 입력
  test('태그가 입력된다.', async ({ page }) => {
    await navigateToAddEpigramPage(page);
    await page.fill('input[placeholder="입력하여 태그 작성 (최대 10자)"]', '테스트태그');
    await expect(page.locator('input[placeholder="입력하여 태그 작성 (최대 10자)"]')).toHaveValue('테스트태그');
  });

  // 7. 태그 추가 버튼 클릭
  test('태그 추가 버튼이 클릭된다.', async ({ page }) => {
    await navigateToAddEpigramPage(page);
    await page.fill('input[placeholder="입력하여 태그 작성 (최대 10자)"]', '테스트태그');
    await page.click('button:has-text("추가")');
    const buttonText = await page.locator('button:has-text("추가")').textContent();
    await expect(buttonText).toBe('추가');
  });

  // 8. 작성 완료 버튼 활성화 여부 확인
  test('작성 완료 버튼이 활성화된다.', async ({ page }) => {
    await navigateToAddEpigramPage(page);
    await page.fill('textarea[name="content"]', '테스트내용');
    await page.click('label[for="custom"]');
    await page.fill('input[name="authorName"]', '테스트이름');
    await page.fill('input[name="sourceTitle"]', '테스트출처');
    await page.fill('input[name="sourceUrl"]', 'http://www.naver.com');
    await page.fill('input[placeholder="입력하여 태그 작성 (최대 10자)"]', '테스트태그');
    await page.fill('input[placeholder="입력하여 태그 작성 (최대 10자)"]', '테스트태그');
    await page.click('button:has-text("추가")');

    const submitButton = page.locator('button[type="submit"]');
    const isEnabled = await submitButton.isEnabled();
    console.log('Submit Button Enabled:', isEnabled);
    await expect(isEnabled).toBe(true);
  });

  // 9. 작성 완료 버튼 클릭 후 이동 확인
  test('작성 완료 버튼 클릭 후 상세 페이지로 이동한다.', async ({ page }) => {
    await navigateToAddEpigramPage(page);
    await page.fill('textarea[name="content"]', '테스트내용');
    await page.click('label[for="custom"]');
    await page.fill('input[name="authorName"]', '테스트이름');
    await page.fill('input[name="sourceTitle"]', '테스트출처');
    await page.fill('input[name="sourceUrl"]', 'http://www.naver.com');
    await page.fill('input[placeholder="입력하여 태그 작성 (최대 10자)"]', '테스트태그');
    await page.click('button:has-text("추가")');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/\/epigrams\/\d+/);
  });

  test('작성 완료 버튼 클릭 후 상세 페이지로 이동하고, 에디트 페이지에서 내용 비교', async ({ page }) => {
    await navigateToAddEpigramPage(page);
    await page.fill('textarea[name="content"]', '테스트내용');
    await page.click('label[for="custom"]');
    await page.fill('input[name="authorName"]', '테스트이름');
    await page.fill('input[name="sourceTitle"]', '테스트출처');
    await page.fill('input[name="sourceUrl"]', 'http://www.naver.com');
    await page.fill('input[placeholder="입력하여 태그 작성 (최대 10자)"]', '테스트태그');
    await page.click('button:has-text("추가")');

    // 작성 완료 버튼 클릭
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // 페이지 이동 대기
    await page.waitForTimeout(3000); // 페이지 이동 대기
    await expect(page).toHaveURL(/\/epigrams\/\d+/); // 에픽그램 상세 페이지로 이동 확인

    // id 값 추출
    const epigramId = page.url().split('/').pop();

    // 해당 id 값 수정페이지로 이동
    await page.goto(`http://localhost:3000/epigrams/${epigramId}/edit`, { waitUntil: 'networkidle' });
    console.log(epigramId);

    // 에픽그램 상세 페이지에서 작성한 내용 비교
    await page.waitForSelector('textarea[name="content"]');
    const content = await page.locator('textarea[name="content"]').inputValue();
    const authorName = await page.locator('input[name="authorName"]').inputValue()
    console.log(authorName)
    const sourceTitle = await page.locator('input[name="sourceTitle"]').inputValue();
    const sourceUrl = await page.locator('input[name="sourceUrl"]').inputValue();

    // 비교: 페이지에 표시된 내용이 작성한 내용과 일치하는지 확인
    await expect(content).toBe('테스트내용');
    await expect(authorName).toBe('테스트이름');
    await expect(sourceTitle).toBe('테스트출처');
    await expect(sourceUrl).toBe('http://www.naver.com');
  });
});

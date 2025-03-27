import { test, expect } from '@playwright/test';

test.describe('에픽그램 만들기', () => {
  test('폼 입력 후 작성완료 버튼 클릭 시 상세 페이지 이동확인', async ({ page }) => {
    // 'accessToken' -> 직접 넣어 테스트 했습니다.
    await page.context().addCookies([
      {
        name: 'accessToken',
        value:
          '직접넣어테스트했습니다',
        path: '/',
        httpOnly: true,
        secure: false,
      },
    ]);

    // 페이지 이동
    await page.goto('http://localhost:3000/addepigram', {
      waitUntil: 'networkidle', // 네트워크 트래픽이 안정화될 때까지 대기
    });

    // 페이지 로드 후 URL 확인
    await expect(page).toHaveURL('http://localhost:3000/addepigram');

    // 내용 입력
    await page.fill('textarea[name="content"]', '테스트내용');

    // 저자 이름 입력 (저자 직접 입력)
    await page.click('label[for="custom"]');
    await page.fill('input[name="authorName"]', '테스트이름');

    // 출처 제목 입력
    await page.fill('input[name="sourceTitle"]', '테스트출처');

    // URL 입력 (http://www.naver.com 형식으로 입력)
    await page.fill('input[name="sourceUrl"]', 'http://www.naver.com');

    // 태그 입력
    await page.fill('input[placeholder="입력하여 태그 작성 (최대 10자)"]', '테스트태그');

    // 태그 추가 버튼 클릭
    await page.click('button:has-text("추가")');

    // '작성 완료' 버튼이 활성화될 때까지 대기
    const submitButton = page.locator('button[type="submit"]');

    // 버튼이 활성화되는지 확인
    const isEnabled = await submitButton.isEnabled();
    console.log('Submit Button Enabled:', isEnabled);

    // 작성 완료 버튼 클릭
    await submitButton.click();

    await page.waitForTimeout(3000);

    await expect(page).toHaveURL(/\/epigrams\/\d+/); // 상세페이지로 이동했는지 확인

    // id 값 추출
    const epigramId = page.url().split('/').pop();

    // 해당 id 값 수정페이지로 이동
    await page.goto(`http://localhost:3000/epigrams/${epigramId}/edit`, { waitUntil: 'networkidle' });

    // 아까 값과 비교
    await expect(page.locator('textarea[name="content"]')).toHaveValue('테스트내용');
    await expect(page.locator('input[name="authorName"]')).toHaveValue('테스트이름');
    await expect(page.locator('input[name="sourceTitle"]')).toHaveValue('테스트출처');
    await expect(page.locator('input[name="sourceUrl"]')).toHaveValue('http://www.naver.com');
  });
});

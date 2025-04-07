import { test, expect } from '@playwright/test';
import dayjs from 'dayjs';

test.describe('마이페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login', {
      waitUntil: 'networkidle',
    });

    await page.fill('input[name="email"]', 'listtest@test.com');
    await page.fill('input[name="password"]', 'qwer1234');

    await page.click('button:text("로그인")');

    await page.waitForSelector('button:text("확인")');
    await page.click('button:text("확인")');

    await page.waitForTimeout(3000);

    await expect(page).toHaveURL('http://localhost:3000/');

    await page.goto('http://localhost:3000/mypage', {
      waitUntil: 'networkidle',
    });

    await expect(page).toHaveURL('http://localhost:3000/mypage');
  });

  test('마이 페이지 로드 확인', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3000/mypage');
  });

  test('헤더의 로고를 클릭하면 랜딩페이지로 이동한다.', async ({ page }) => {
    await page.getByAltText('헤더 로고').click();
    await expect(page).toHaveURL('http://localhost:3000');
  });

  test('헤더의 피드 링크를 클릭하면 피드 페이지로 이동한다.', async ({ page }) => {
    await page.getByRole('link', { name: '피드' }).click();
    await expect(page).toHaveURL('http://localhost:3000/feed');
  });

  test('헤더의 검색 링크를 클릭하면 검색 페이지로 이동한다.', async ({ page }) => {
    await page.getByRole('link', { name: '검색' }).click();
    await expect(page).toHaveURL('http://localhost:3000/search');
  });

  test('로그아웃 버튼 클릭 시, 로그아웃이 되면서 랜딩페이지로 이동한다.', async ({ page }) => {
    const logoutButton = page.getByRole('button', { name: '로그아웃' });

    await logoutButton.click();

    await page.waitForTimeout(500);

    const cookies = await page.context().cookies();
    const hasAccessToken = cookies.some((cookie) => cookie.name === 'accessToken');
    const hasRefreshToken = cookies.some((cookie) => cookie.name === 'refreshToken');
    expect(hasAccessToken).toBeFalsy();
    expect(hasRefreshToken).toBeFalsy();
  });

  test('프로필 이미지 클릭 시, 파일 업로드 프로세스를 이용하여 이미지를 변경할 수 있게 한다.', async ({ page }) => {
    const userImage = page.getByAltText('유저이미지');
    userImage.click();

    const fileChooserPromise = page.waitForEvent('filechooser');
    await userImage.click();
    const fileChooser = await fileChooserPromise;

    await fileChooser.setFiles({
      name: 'test-profile.png',
      mimeType: 'image/png',
      buffer: Buffer.from('fake image content'),
    });
  });

  test('오늘의 감정 클릭 시, 캘린더에 즉시 적용된다.', async ({ page }) => {
    const emotions = ['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY'];
    const today = dayjs().date().toString();
    const dayCell = page.getByText(today).locator('..');
    for (const emotion of emotions) {
      await page.getByRole('button', { name: emotion }).click();
      await page.waitForTimeout(1000);

      const svg = dayCell.locator(`svg[aria-label="${emotion}"]`);

      await expect(svg).toBeVisible({ timeout: 3000 });
    }
  });

  test('캘린더에서 prev버튼을 누르면 이전 달로 변경이 되고, 감정 차트도 해당 달로 변경이 된다.', async ({ page }) => {
    const today = dayjs();
    const year = today.year();
    const month = today.month() + 1;
    // 현재 날짜가 선택됐는지
    await expect(page.getByText(`${year}년 ${month}월`)).toBeVisible({ timeout: 3000 });

    const prevButton = page.getByAltText('이전 월 선택 이미지');
    await prevButton.click();

    const prevDate = today.add(-1, 'month');
    const prevYear = prevDate.year();
    const prevMonth = prevDate.month() + 1;
    // 지난 달로 변경됐는지
    await expect(page.getByText(`${prevYear}년 ${prevMonth}월`)).toBeVisible({ timeout: 3000 });

    // 감정 차트도 변경됐는지
    const emotionChart = page.getByTestId(`emotion-chart-${prevYear}-${prevMonth}`);
    await expect(emotionChart).toBeVisible({ timeout: 3000 });
  });

  test('캘린더에서 next버튼을 누르면 다음 달로 변경이 되고, 감정 차트도 해당 달로 변경이 된다.', async ({ page }) => {
    const today = dayjs();
    const year = today.year();
    const month = today.month() + 1;
    // 현재 날짜가 선택됐는지
    await expect(page.getByText(`${year}년 ${month}월`)).toBeVisible({ timeout: 3000 });

    const nextButton = page.getByAltText('이후 월 선택 이미지');
    await nextButton.click();

    const nextDate = today.add(1, 'month');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month() + 1;
    // 다음 달로 변경됐는지
    await expect(page.getByText(`${nextYear}년 ${nextMonth}월`)).toBeVisible({ timeout: 3000 });

    // 감정 차트도 변경됐는지
    const emotionChart = page.getByTestId(`emotion-chart-${nextYear}-${nextMonth}`);
    await expect(emotionChart).toBeVisible({ timeout: 3000 });
  });

  {
    /*내 에피그램과 내 댓글이 있다면 통과하는 테스트들 */
  }

  test('내 에피그램 클릭 시, 해당 에피그램 상세페이지로 이동한다.', async ({ page }) => {
    const myEpigrams = page.getByTestId('epigram-link-0');
    await myEpigrams.click();

    {
      /*id값이 어떤 숫자이든 상관없이, URL 패턴만 맞으면 통과 */
    }
    await expect(page).toHaveURL(/\/epigrams\/\d+$/);
  });

  test('더보기 버튼 클릭 시, 에피그램이 추가적으로 나타난다.', async ({ page }) => {
    const epigramsBefore = await page.locator('[data-testid^="epigram-link-"]').count();

    const loadMoreButton = page.getByRole('button', { name: '에피그램 더보기' });
    await expect(loadMoreButton).toBeVisible();

    await loadMoreButton.click();

    await page.waitForTimeout(1000);

    const epigramsAfter = await page.locator('[data-testid^="epigram-link-"]').count();

    expect(epigramsAfter).toBeGreaterThan(epigramsBefore);
  });

  test('내 댓글 클릭 시, 해당 댓글의 에피그램 상세페이지로 이동한다.', async ({ page }) => {
    const myCommentButton = page.getByRole('button', { name: /내 댓글/i });
    await myCommentButton.click();

    const myComments = page.getByTestId('comment-link-0');
    await myComments.click();

    await expect(page).toHaveURL(/\/epigrams\/\d+$/);
  });

  test('더보기 버튼 클릭 시, 댓글이 추가적으로 나타난다.', async ({ page }) => {
    const myCommentButton = page.getByRole('button', { name: /내 댓글/i });
    await myCommentButton.click();

    const myCommentsBefore = await page.locator('[data-testid^="comment-link-"]').count();

    const loadMoreButton = page.getByRole('button', { name: '댓글 더보기' });
    await expect(loadMoreButton).toBeVisible();

    await loadMoreButton.click();

    await page.waitForTimeout(1000);

    const myCommentsAfter = await page.locator('[data-testid^="comment-link-"]').count();

    expect(myCommentsAfter).toBeGreaterThan(myCommentsBefore);
  });

  {
    /*내 에피그램, 내 댓글이 없는 경우, 통과하는 테스트들 */
  }
  test('에피그램 둘러보기 버튼 클릭 시, /epigrams 으로 이동한다.', async ({ page }) => {
    const myCommentButton = page.getByRole('button', { name: /내 댓글/i });

    await myCommentButton.click();

    const epigramButton = page.getByRole('button', { name: '에피그램 둘러보기' });
    await epigramButton.click();

    await expect(page).toHaveURL('/epigrams');
  });

  test('에피그램 만들기 버튼 클릭 시, /addepigram 으로 이동한다.', async ({ page }) => {
    const addEpigramButton = page.getByTestId('add-epigram');
    await addEpigramButton.click();

    await expect(page).toHaveURL('/addepigram');
  });
});

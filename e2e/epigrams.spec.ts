import { test, expect, BrowserContext, Page } from '@playwright/test';

test.describe('메인 페이지', () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
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
    page = await context.newPage();
    await page.goto('/epigrams');
  });

  test.afterEach(async () => {
    await context.close();
  });

  test('메인 페이지 로드 확인', async () => {
    await expect(page).toHaveURL('http://localhost:3000/epigrams');
  });

  test('헤더의 로고를 클릭하면 랜딩페이지로 이동한다.', async () => {
    await page.getByRole('link', { name: '헤더 로고' }).click();
    await expect(page).toHaveURL('http://localhost:3000/');
  });

  test('헤더의 피드 링크를 클릭하면 피드 페이지로 이동한다.', async () => {
    await page.getByRole('link', { name: '피드' }).click();
    await expect(page).toHaveURL('http://localhost:3000/feed');
  });

  test('헤더의 검색 링크를 클릭하면 검색 페이지로 이동한다.', async () => {
    await page.getByRole('link', { name: '검색' }).click();
    await expect(page).toHaveURL('http://localhost:3000/search');
  });

  test('헤더의 프로필 이미지를 클릭하면 마이페이지로 이동한다', async () => {
    await page.getByRole('link', { name: '프로필 이미지' }).click();
    await expect(page).toHaveURL('http://localhost:3000/mypage');
  });

  test('오늘의 에피그램이 존재하고, 클릭 시 상세페이지로 이동한다', async () => {
    const test = await page.locator('section').filter({ hasText: '오늘의 에피그램' }).getByRole('link');
    if (await test.isVisible()) {
      await test.click();
      // http://localhost:3000/epigrams/숫자 형태의 정규표현식
      await expect(page).toHaveURL(/\/epigrams\/\d+$/);
    }
  });

  test('오늘의 감정을 클릭 시 오늘의 감정 컴포넌트가 사라진다', async () => {
    await page.route('**/api/emotionLogs/today', (route) => {
      route.fulfill({
        status: 201,
        body: JSON.stringify({
          createdAt: 'string',
          emotion: 'string',
          userId: 'string',
          id: 'string',
        }),
      });
    });

    await page
      .locator('div')
      .filter({ hasText: /^감동$/ })
      .getByRole('button')
      .click();
    await page.waitForTimeout(1000);
    await expect(page.locator('section').filter({ hasText: '오늘의 감정은 어떤가요?' })).not.toBeVisible();
  });

  test('최신 에피그램을 클릭 시 상세페이지로 이동한다', async () => {
    await page.locator('section').filter({ hasText: '최신 에피그램' }).getByRole('link').nth(1).click();
    await expect(page).toHaveURL(/\/epigrams\/\d+$/);
  });

  test('에피그램 더보기 버튼을 클릭시 에피그램을 더 불러온다', async () => {
    const epigramItemsLocator = page.locator('section').filter({ hasText: '최신 에피그램' }).getByRole('link');
    const initialCount = await epigramItemsLocator.count();

    await page.getByRole('button', { name: '에피그램 더보기' }).click();
    await page.waitForTimeout(1000);

    const newCount = await epigramItemsLocator.count();
    expect(newCount).toBeGreaterThan(initialCount);
  });

  test('최신 댓글 더보기 버튼을 클릭 시 최신 댓글을 더 불러온다', async () => {
    const commentItemsLocator = page.locator('section').filter({ hasText: '최신 댓글' }).getByAltText('프로필 이미지');
    const initialCount = await commentItemsLocator.count();

    await page.getByRole('button', { name: '최신 댓글 더보기' }).click();
    await page.waitForTimeout(1000);

    const newCount = await commentItemsLocator.count();
    expect(newCount).toBeGreaterThan(initialCount);
  });

  test('플로팅 액션 버튼을 클릭하면 스크롤 최상단으로 이동한다.', async () => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const scrollPositionBefore = await page.evaluate(() => window.scrollY);
    expect(scrollPositionBefore).toBeGreaterThan(0);

    await page.getByRole('button', { name: '플로팅 액션 버튼 이미지' }).click();

    await page.waitForTimeout(1000);

    const scrollPositionAfter = await page.evaluate(() => window.scrollY);
    expect(scrollPositionAfter).toBe(0);
  });

  test('에피그램 만들기 버튼을 클릭하면 에피그램 생성 페이지로 이동한다', async () => {
    await page.getByRole('button', { name: '에피그램 만들기' }).click();
    await expect(page).toHaveURL('http://localhost:3000/addepigram');
  });
});

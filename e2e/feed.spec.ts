import { test, expect, BrowserContext, Page } from '@playwright/test';

test.describe('로그인 이전 피드 페이지', () => {
  test('로그아웃 된 상태에서 접속 시 로그인 페이지로 리다이렉트 된다.', async ({ page }) => {
    await page.goto('/feed');
    await expect(page).toHaveURL('http://localhost:3000/login');
  });
});

test.describe('로그인 이후 피드 페이지', () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('/login');
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input-login').fill('test5@email.com');
    await page.getByTestId('password-input-login').fill('password1!');
    await page.getByRole('button', { name: '로그인' }).click();
    await page.getByRole('button', { name: '확인' }).click();
    await page.goto('/feed');
    await page.waitForTimeout(1000);
  });

  test.afterEach(async () => {
    await context.close();
  });

  test('피드 페이지 로드 확인', async () => {
    await expect(page).toHaveURL('http://localhost:3000/feed');
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
    await page.getByRole('button', { name: '프로필 이미지' }).click();
    await page.getByText('마이페이지').click();
    await expect(page).toHaveURL('http://localhost:3000/mypage');
  });

  test('피드 페이지에서 에피그램 카드 클릭 시 상세 페이지로 이동한다.', async () => {
    await page.locator('section').filter({ hasText: '피드' }).getByRole('link').nth(0).click();
    await expect(page).toHaveURL(/\/epigrams\/\d+$/);
  });

  test('에피그램 더 보기 버튼 클릭 시 에피그램을 더 불러온다.', async () => {
    const epigramItemsLocator = page.locator('section').filter({ hasText: '피드' }).getByRole('link');
    const initialCount = await epigramItemsLocator.count();

    await page.getByRole('button', { name: '에피그램 더보기' }).click();
    await page.waitForTimeout(1000);

    const newCount = await epigramItemsLocator.count();
    expect(newCount).toBeGreaterThan(initialCount);
  });

  test('플로팅 액션 버튼을 클릭하면 스크롤 최상단으로 이동한다.', async () => {
    await page.getByRole('button', { name: '에피그램 더보기' }).click();
    await page.waitForTimeout(1000);

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

  test('정렬 아이콘을 클릭하면 grid <--> flex 레이아웃이 토글된다.', async () => {
    await page.getByRole('img', { name: 'y축 정렬 아이콘' }).click();
    const flexLayoutClass = await page.getByTestId('feed-layout').getAttribute('class');
    expect(flexLayoutClass?.includes('flex')).toBeTruthy();

    await page.getByRole('img', { name: '표 정렬 아이콘' }).click();
    const gridLayoutClass = await page.getByTestId('feed-layout').getAttribute('class');
    expect(gridLayoutClass?.includes('grid')).toBeTruthy();
  });
});

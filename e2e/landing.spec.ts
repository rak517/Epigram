import { test, expect, BrowserContext, Page } from '@playwright/test';

test.describe('랜딩 페이지', () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('/');
    await page.waitForTimeout(1000);
  });

  test.afterEach(async () => {
    await context.close();
  });

  test('랜딩 페이지 로드 확인', async () => {
    await expect(page).toHaveURL('http://localhost:3000');
  });

  test('로그인이 안되어 있으면, 검색 아이콘 클릭 시 로그인 페이지로 이동한다', async () => {
    await page.getByAltText('검색 아이콘').click();
    await expect(page).toHaveURL('http://localhost:3000/login');
  });

  test('로고 클릭 시 랜딩 페이지로 이동한다.', async () => {
    await page.getByAltText('헤더 로고').click();
    await expect(page).toHaveURL('http://localhost:3000');
  });

  test('로그인이 안되어 있으면, 유저 아이콘 클릭 시 로그인 페이지로 이동한다.', async () => {
    await page.getByAltText('유저 아이콘').click({ timeout: 3000 });
    await page.getByText('로그인').click({ timeout: 3000 });
    await expect(page).toHaveURL('http://localhost:3000/login');
  });

  test('로그인이 안되어 있으면, 시작하기 텍스트 클릭 시 로그인 페이지로 이동한다', async () => {
    await page.getByRole('link', { name: '시작하기' }).first().click();
    await expect(page).toHaveURL('http://localhost:3000/login');
  });

  test('로그인이 안되어 있으면, 하단의 시작하기 텍스트 클릭 시 로그인 페이지로 이동한다', async () => {
    await page.getByRole('link', { name: '시작하기' }).nth(1).click();
    await expect(page).toHaveURL('http://localhost:3000/login');
  });

  test('더 알아보기 텍스트 클릭 시 기능 소개 레이아웃으로 스크롤이 내려간다', async () => {
    const initialScrollY = await page.evaluate(() => window.scrollY);

    await page.getByText('더 알아보기').click();

    await page.waitForTimeout(1000);

    const newScrollY = await page.evaluate(() => window.scrollY);

    expect(newScrollY).toBeGreaterThan(initialScrollY);
  });

  test('하단 화살표 이미지 클릭 시 기능 소개 레이아웃으로 스크롤이 내려간다', async () => {
    const initialScrollY = await page.evaluate(() => window.scrollY);

    await page.getByAltText('아래로 스크롤').click();

    await page.waitForTimeout(1000);

    const newScrollY = await page.evaluate(() => window.scrollY);

    expect(newScrollY).toBeGreaterThan(initialScrollY);
  });
});

test.describe('로그인이 되어있는 랜딩페이지', () => {
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
    await page.goto('/');
    await page.waitForTimeout(1000);
  });

  test.afterEach(async () => {
    await context.close();
  });

  test('랜딩 페이지 로드 확인', async () => {
    await expect(page).toHaveURL('http://localhost:3000');
  });

  test('로그인이 되어 있으면, 검색 아이콘 클릭 시 검색 페이지로 이동한다', async () => {
    await page.getByAltText('검색 아이콘').click();
    await expect(page).toHaveURL('http://localhost:3000/search');
  });

  test('로그인이 되어 있으면, 유저 아이콘 클릭 시 마이 페이지로 이동한다', async () => {
    await page.getByAltText('유저 아이콘').click({ timeout: 3000 });
    await page.getByText('마이페이지').click({ timeout: 3000 });
    await expect(page).toHaveURL('http://localhost:3000/mypage');
  });

  test('로그인이 되어 있으면 시작하기 텍스트 클릭 시 에피그램 페이지로 이동한다', async () => {
    await page.getByRole('link', { name: '시작하기' }).first().click();
    await expect(page).toHaveURL('http://localhost:3000/epigrams');
  });

  test('로그인이 되어 있으면, 페이지 하단의 시작하기 텍스트 클릭 시 에피그램 페이지로 이동한다', async () => {
    await page.getByRole('link', { name: '시작하기' }).nth(1).click();
    await expect(page).toHaveURL('http://localhost:3000/epigrams');
  });
});

import { test, expect, BrowserContext, Page } from '@playwright/test';

test.describe('랜딩 페이지', () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('/');
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
    await page.getByAltText('유저 아이콘').click();
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

    await page.getByAltText('더 알아보기').click();

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
    await page.goto('/');
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
    await page.getByAltText('유저 아이콘').click();
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

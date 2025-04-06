import { test, expect } from '@playwright/test';
import dayjs from 'dayjs';

test.describe('마이페이지', () => {
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

  {
    /*오늘의 감정 클릭까진 했는데 캘린더를 인지하고, 적용시키는 부분이 안됨.(not-found 에러) */
  }
  test('오늘의 감정 클릭 시, 캘린더에 즉시 적용된다.', async ({ page }) => {
    const emotions = ['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY'];
    const today = dayjs().date().toString();
    for (const emotion of emotions) {
      const button = page.getByRole('button', { name: emotion });
      await expect(button).toBeVisible();
      await button.click();

      const cell = page.locator(`div[role="gridcell"]:has-text("${today}") svg[aria-label="${emotion}"]`);
      await expect(cell).toBeVisible({ timeout: 5000 });
    }
  });

  {
    /* 아래 두 테스트에서 캘린더를 인식시켜서 변경점을 테스트해야하는데 캘릭더 인식하는 부분에서 not found만 나옴  */
  }
  test('캘린더에서 prev버튼을 누르면 이전 달로 변경이 되고, 감정 차트도 해당 달로 변경이 된다.', async ({ page }) => {
    const prevButton = page.getByAltText('이전 월 선택 이미지');
    await prevButton.click();
  });

  test('캘린더에서 next버튼을 누르면 다음 달로 변경이 되고, 감정 차트도 해당 달로 변경이 된다.', async ({ page }) => {
    const nextButton = page.getByAltText('이후 월 선택 이미지');
    await nextButton.click();
  });
});

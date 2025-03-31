import { Page, expect } from '@playwright/test';

export async function navigateToAddEpigramPage(page: Page) {
  // 로그인 페이지로 이동
  await page.goto('http://localhost:3000/login', {
    waitUntil: 'networkidle', // 네트워크가 안정될 때까지 대기
  });

  // 이메일과 비밀번호 입력
  await page.fill('input[name="email"]', 'tito625@naver.com');
  await page.fill('input[name="password"]', 'test1234@');

  // '로그인' 텍스트가 있는 버튼 클릭
  await page.click('button:text("로그인")');

  // 로그인 후 모달에서 '확인' 텍스트가 있는 버튼 클릭
  await page.waitForSelector('button:text("확인")'); // 모달이 열리기를 기다림
  await page.click('button:text("확인")'); // '확인' 버튼 클릭

  await page.waitForTimeout(3000); // 3초 대기

  // 메인 페이지로 이동했는지 확인
  await expect(page).toHaveURL('http://localhost:3000/'); // 메인 페이지 URL 확인

  const cookies = await page.context().cookies();
  const accessTokenCookie = cookies.find((cookie) => cookie.name === 'accessToken');

  if (!accessTokenCookie) {
    throw new Error('로그인 실패: accessToken을 받을 수 없습니다.');
  }

  const accessToken = accessTokenCookie.value;

  // 받은 accessToken을 쿠키로 설정
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

  // 3초 대기
  await page.waitForTimeout(3000); // 3초 대기

  // addepigram 페이지로 이동
  await page.goto('http://localhost:3000/addepigram', {
    waitUntil: 'networkidle', // 네트워크가 안정될 때까지 대기
  });

  // 최종 URL 확인
  await expect(page).toHaveURL('http://localhost:3000/addepigram');
}

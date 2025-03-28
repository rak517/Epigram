import { Page, expect } from '@playwright/test';

export async function navigateToAddEpigramPage(page: Page) {
  // 로그인 쿠키 추가
  await page.context().addCookies([
    {
      name: 'accessToken',
      value:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM0NiwidGVhbUlkIjoiMTItMzMiLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTc0MzE0NDg3OCwiZXhwIjoxNzQzMTQ2Njc4LCJpc3MiOiJzcC1lcGlncmFtIn0.nyHtB4CyVervHxiAAvzb-MTk-rbU_5stK4Y4UuveX9A',
      path: '/',
      domain: 'localhost',
      httpOnly: true,
      secure: false,
    },
  ]);

  // addepigram 페이지로 이동
  await page.goto('http://localhost:3000/addepigram', {
    waitUntil: 'networkidle', // 네트워크가 안정될 때까지 대기
  });

  await expect(page).toHaveURL('http://localhost:3000/addepigram');
}

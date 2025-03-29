import { test, expect } from '@playwright/test';
import { navigateToAddEpigramPage } from '@/utils/navigate/navigateToAddEpigramPage';

test('작성 후 수정 페이지에서 수정하고, 상세 페이지에서 비교', async ({ page }) => {
  await navigateToAddEpigramPage(page);

  // 원래 작성한 데이터
  const originalContent = '테스트내용';
  const originalAuthor = '테스트이름';
  const originalReferenceTitle = '테스트출처';
  const originalReferenceUrl = 'https://www.naver.com';
  const originalTag = '테스트태그';

  // 입력
  await page.fill('textarea[name="content"]', originalContent);
  await page.click('label[for="custom"]');
  await page.fill('input[name="author"]', originalAuthor);
  await page.fill('input[name="referenceTitle"]', originalReferenceTitle);
  await page.fill('input[name="referenceUrl"]', originalReferenceUrl);
  await page.fill('input[placeholder="입력하여 태그 작성 (최대 10자)"]', originalTag);
  await page.click('button:has-text("추가")');

  // 작성 완료 버튼 클릭
  const submitButton = page.locator('button[type="submit"]');
  await submitButton.click();

  // 페이지 이동 대기
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(/\/epigrams\/\d+/);

  // ID 값 추출
  const epigramId = page.url().split('/').pop();

  // 수정 페이지로 이동
  await page.goto(`http://localhost:3000/epigrams/${epigramId}/edit`, { waitUntil: 'networkidle' });

  // 새로운 수정 데이터
  const updatedContent = '수정된 테스트내용';
  const updatedAuthor = '수정된 테스트이름';
  const updatedReferenceTitle = '수정된 테스트출처';
  const updatedReferenceUrl = 'https://www.google.com';

  // 값 수정
  await page.fill('textarea[name="content"]', updatedContent);
  await page.fill('input[name="author"]', updatedAuthor);
  await page.fill('input[name="referenceTitle"]', updatedReferenceTitle);
  await page.fill('input[name="referenceUrl"]', updatedReferenceUrl);

  // 수정 완료 버튼 클릭
  const updateSubmitButton = page.locator('button[type="submit"]');
  await updateSubmitButton.click();

  // 모달이 뜰 때까지 기다림 (모달이 나타나는 특정 요소를 기다림)
  const modalConfirmButton = page.locator('button:has-text("확인")');
  await modalConfirmButton.waitFor({ state: 'visible' });

  // 모달에서 "확인" 버튼 클릭
  await modalConfirmButton.click();

  await page.waitForTimeout(3000);

  await page.goto(`http://localhost:3000/epigrams/${epigramId}/edit`, { waitUntil: 'networkidle' });


  /// 수정된 내용 확인 (수정 페이지에서)
  await expect(page.locator('textarea[name="content"]')).toHaveValue(updatedContent);
  await expect(page.locator('input[name="author"]')).toHaveValue(updatedAuthor);
  await expect(page.locator('input[name="referenceTitle"]')).toHaveValue(updatedReferenceTitle);
  await expect(page.locator('input[name="referenceUrl"]')).toHaveValue(updatedReferenceUrl);
});

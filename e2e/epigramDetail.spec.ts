import { test, expect, BrowserContext, Page } from '@playwright/test';

const TEST_EPIGRAM_ID = '1562';

test.describe('로그인 이전 상세 페이지', () => {
  test('로그인이 안된 상태에서 상세페이지 접속 시 로그인 페이지로 리다이렉트 된다', async ({ page }) => {
    await page.goto(`/epigrams/${TEST_EPIGRAM_ID}`);
    await expect(page).toHaveURL('http://localhost:3000/login');
  });
});

test.describe('로그인 이후 상세 페이지', () => {
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
    await page.goto(`/epigrams/${TEST_EPIGRAM_ID}`);
    await page.waitForTimeout(1000);
  });

  test.afterEach(async () => {
    await context.close();
  });

  test('에피그램 상세페이지가 로드된다', async () => {
    await expect(page).toHaveURL(`http://localhost:3000/epigrams/${TEST_EPIGRAM_ID}`);
  });

  test('헤더의 로고를 클릭하면 랜딩페이지로 이동한다', async () => {
    await page.getByRole('link', { name: '헤더 로고' }).click();
    await expect(page).toHaveURL('http://localhost:3000/');
  });

  test('공유 버튼 클릭 시 해당 URL을 복사한다', async () => {
    await page.getByRole('button', { name: 'URL 복사' }).click();
    await expect(page.getByTestId('toast-message')).toBeVisible();
  });

  test('좋아요 버튼을 누르면 상태가 변경된다', async () => {
    const likeCountElement = page.locator('.text-md.min-w-\\[65px\\]');
    const initialCount = await likeCountElement.textContent();

    await page
      .getByRole('button')
      .filter({ has: page.locator('img[alt="좋아요 따봉 이미지"]') })
      .click();
    await page.waitForTimeout(500);

    const newCount = await likeCountElement.textContent();
    expect(initialCount).not.toEqual(newCount);
  });

  test('태그 클릭 시 검색 페이지로 이동한다', async () => {
    const tagElement = page.locator('span.text-blue-400').filter({ hasText: /^#/ }).first();

    const tagText = await tagElement.textContent();
    const tagName = tagText?.replace('#', '');

    await tagElement.click();

    await expect(page).toHaveURL(`http://localhost:3000/search?keyword=${encodeURIComponent(tagName || '')}`);
  });

  test('출처 URL이 있으면 외부 링크 버튼이 표시되고 클릭 가능하다', async () => {
    const externalLinkButton = page.getByRole('button', { name: '왕도로 가는 길' });

    if (await externalLinkButton.isVisible()) {
      const pagePromise = context.waitForEvent('page');
      await externalLinkButton.click();
      const newPage = await pagePromise;

      expect(newPage.url()).not.toBe(`http://localhost:3000/epigrams/${TEST_EPIGRAM_ID}`);
      await newPage.close();
    }
  });
  test('자신이 작성한 글이면 드롭다운 메뉴가 보이고, 수정, 삭제 버튼이 표시되고 기능한다', async () => {
    const dropdownMenu = page.locator('.absolute.right-0.h-5.w-5, .absolute.right-0.h-9.w-9').first();

    if (await dropdownMenu.isVisible()) {
      await dropdownMenu.click();

      const editButton = page.getByText('수정하기');

      if (await editButton.isVisible()) {
        await editButton.click();
        await expect(page).toHaveURL(new RegExp(`/epigrams/${TEST_EPIGRAM_ID}/edit`));

        await page.goto(`/epigrams/${TEST_EPIGRAM_ID}`);
        await page.waitForTimeout(1000);
      }

      await dropdownMenu.click();

      const deleteButton = page.getByText('삭제하기');

      if (await deleteButton.isVisible()) {
        await deleteButton.click();

        await expect(page.getByText('에피그램 삭제')).toBeVisible();
        await expect(page.getByText('정말로 이 에피그램을 삭제하시겠습니까?')).toBeVisible();

        await page.getByRole('button', { name: '취소' }).click();
      }
    }
  });
  test('댓글 작성 기능이 정상 동작한다', async () => {
    const commentTextArea = page.locator('textarea').first();
    await expect(commentTextArea).toBeVisible();

    const testComment = '테스트 댓글';
    await commentTextArea.fill(testComment);

    await page.getByRole('button', { name: '저장' }).click();

    await expect(commentTextArea).toHaveValue('');

    await expect(page.getByText(testComment).first()).toBeVisible();
  });
  test('댓글 목록이 표시되고 프로필 모달이 작동한다', async () => {
    const comments = page.locator('div.bg-background-100.border-line-200.flex.max-w-\\[640px\\]');
    await expect(comments.first()).toBeVisible();

    const profileImage = comments.first().locator('img').first();
    await profileImage.click();

    await expect(page.getByTestId('profile-modal')).toBeVisible();

    await page.getByAltText('모달 닫기 아이콘').click();
  });
  test('자신이 작성한 댓글은 수정/삭제가 가능하다', async () => {
    const comments = page.locator('div.bg-background-100.border-line-200.flex');
    await expect(comments.first()).toBeVisible();

    const editButton = page.getByRole('button', { name: '수정' }).first();
    const deleteButton = page.getByRole('button', { name: '삭제' }).first();

    if ((await editButton.isVisible()) && (await deleteButton.isVisible())) {
      await expect(editButton).toBeVisible();
      await expect(deleteButton).toBeVisible();

      await editButton.click();
      await expect(page.getByText('댓글 수정')).toBeVisible();

      const editTextArea = page.locator('textarea').nth(1);
      await expect(editTextArea).toBeVisible();

      const originalText = await editTextArea.inputValue();

      const saveButton = page.getByRole('button', { name: '저장' }).nth(1);
      await expect(saveButton).toBeDisabled();

      const modifiedText = `${originalText} (수정됨)`;
      await editTextArea.fill(modifiedText);
      await expect(saveButton).toBeEnabled();

      await saveButton.click();
      const okButton = page.getByRole('button', { name: '확인' });
      await okButton.click();
      await expect(page.getByText(modifiedText).first()).toBeVisible();

      await deleteButton.click();
      await expect(page.getByText('정말 삭제하시겠습니까?')).toBeVisible();

      const confirmButton = page.getByRole('button', { name: '확인' });
      const cancelButton = page.getByRole('button', { name: '취소' });

      await expect(confirmButton).toBeVisible();
      await expect(cancelButton).toBeVisible();

      await cancelButton.click();
      await expect(page.getByText('정말로 댓글을 삭제하시겠습니까?')).not.toBeVisible();
    } else {
      console.log('자신이 작성한 댓글이 없어 수정/삭제 테스트를 건너뜁니다.');
    }
  });

  test('댓글 더보기 버튼이 작동한다', async () => {
    const loadMoreButton = page.getByRole('button', { name: '최신 댓글 더보기' });

    if (await loadMoreButton.isVisible()) {
      const initialCommentCount = await page.locator('div.bg-background-100.border-line-200.flex.max-w-\\[640px\\]').count();

      await loadMoreButton.click();
      await page.waitForTimeout(1000);

      const newCommentCount = page.locator('div.bg-background-100.border-line-200.flex.max-w-\\[640px\\]').count();
      expect(newCommentCount).toBeGreaterThan(initialCommentCount);
    }
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

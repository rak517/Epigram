export const CopyCurrentUrl = (successMessage = 'URL이 클립보드에 복사되었습니다.', errorMessage = 'URL 복사에 실패했습니다. 직접 주소창의 URL을 복사해주세요.'): Promise<boolean> => {
  return new Promise((resolve) => {
    const currentURL = window.location.href;

    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        alert(successMessage);
        resolve(true);
      })
      .catch((err) => {
        console.error(err);
        alert(errorMessage);
        resolve(false);
      });
  });
};

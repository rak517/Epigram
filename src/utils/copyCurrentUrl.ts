export const copyCurrentUrl = async (
  onSuccess?: (message: string) => void,
  onError?: (message: string) => void,
  successMessage = 'URL이 클립보드에 복사되었습니다.',
  errorMessage = 'URL 복사에 실패했습니다. 직접 주소창의 URL을 복사해주세요.',
): Promise<boolean> => {
  try {
    const currentURL = window.location.href;
    await navigator.clipboard.writeText(currentURL);

    if (onSuccess) {
      onSuccess(successMessage);
    } else {
      alert(successMessage);
    }
    return true;
  } catch (err) {
    console.error(err);

    if (onError) {
      onError(errorMessage);
    } else {
      alert(errorMessage);
    }
    return false;
  }
};

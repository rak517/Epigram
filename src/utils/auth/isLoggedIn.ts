export const isLoggedIn = (): boolean => {
    if (typeof window === 'undefined') return false;
    return document.cookie.includes('accessToken');
  };

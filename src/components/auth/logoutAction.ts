'use server';

import { cookies } from 'next/headers';

const logout = async () => {
  try {
    const cookieStore = await cookies();

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    return {
      status: true,
      error: '',
    };
  } catch {
    return {
      status: false,
      error: '알 수 없는 오류가 발생했습니다.',
    };
  }
};

export default logout;

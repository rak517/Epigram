'use client';

import { useRouter } from 'next/navigation';
import logout from '@/actions/logoutAction';

export const useHandleHeaderSelect = () => {
  const router = useRouter();

  const handleSelect = async (option: string) => {
    if (option === '마이페이지') {
      router.push('/mypage');
    } else if (option === '로그아웃') {
      const result = await logout();
      if (result.status) {
        router.push('/login');
      } else {
        console.error(result.error);
        alert(result.error);
      }
    } else if (option === '로그인') {
      router.push('/login');
    }
  };

  return handleSelect;
};

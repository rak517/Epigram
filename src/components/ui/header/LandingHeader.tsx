'use client';

import Image from 'next/image';
import headerLogo from '@/assets/images/headerLogo.svg';
import userIconDark from '@/assets/icons/userIconDark.svg';
import searchIcon from '@/assets/icons/searchIcon.svg';
import Link from 'next/link';
import DropdownMenu from '@/components/ui/DropdownMenu';
import { useRouter } from 'next/navigation';
import logout from '@/actions/logoutAction';
import { useEffect, useState } from 'react';
import { getUser } from '@/apis/user';

export interface LandingHeaderProps {
  showIcon?: boolean;
}

export default function LandingHeader({ showIcon = false }: LandingHeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await getUser(); 
        if (user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  const options = isLoggedIn ? ['마이페이지', '로그아웃'] : ['로그인'];

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
    }
    else if (option === '로그인') {
      router.push('/login');
    }
  };

  if (showIcon) {
    return (
      <header className="border-b-line-100 fixed z-100 flex w-full items-center justify-between border-b bg-white px-6 py-2 md:h-[60px] md:px-[72px] md:py-3 xl:h-20 xl:px-[120px] xl:py-4">
        <Link href={'/search'}>
          <Image src={searchIcon} alt="검색 아이콘" className="xl:w-9" />
        </Link>
        <Link href={'/'}>
          <Image src={headerLogo} alt="헤더 로고" className="h-[36px] w-[119px] xl:h-12 xl:w-[172px]" priority />
        </Link>
        <DropdownMenu
          size="sm"
          options={options}
          onSelect={handleSelect}
          trigger={<Image src={userIconDark} alt="유저 아이콘" />}
        />
      </header>
    );
  }

  return (
    <header className="border-b-line-100 fixed z-100 flex w-full items-center justify-center border-b bg-white py-3.5 md:h-[60px] xl:h-20">
      <Link href={'/'} className="flex items-center justify-center">
        <Image src={headerLogo} alt="헤더 로고" className="xl:h-9 xl:w-[131px]" />
      </Link>
    </header>
  );
}

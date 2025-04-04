'use client';

import Image from 'next/image';
import headerLogo from '@/assets/images/headerLogo.svg';
import userIconDark from '@/assets/icons/userIconDark.svg';
import searchIcon from '@/assets/icons/searchIcon.svg';
import Link from 'next/link';
import DropdownMenu from '@/components/ui/DropdownMenu';
import { useRouter } from 'next/navigation';

export interface LandingHeaderProps {
  showIcon?: boolean;
}

export default function LandingHeader({ showIcon = false }: LandingHeaderProps) {
  const router = useRouter();

  const handleSelect = (option: string) => {
    if (option === '마이페이지') {
      router.push('/mypage');
    } else if (option === '로그아웃') {
      console.log('로그아웃');
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
          options={['마이페이지', '로그아웃']}
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

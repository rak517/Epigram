'use client';
import Image from 'next/image';
import headerLogo from '@/assets/images/headerLogo.svg';
import userIconDark from '@/assets/icons/userIconDark.svg';
import searchIcon from '@/assets/icons/searchIcon.svg';
import Link from 'next/link';

export interface LandingHeaderProps {
  showIcon?: boolean;
}

export default function LandingHeader({ showIcon = false }: LandingHeaderProps) {
  if (showIcon) {
    return (
      <header className='border-b-line-100 flex items-center justify-between border-b-[1px] px-6 py-2 md:h-[80px] md:py-3 xl:px-[72px] xl:px-[120px] xl:py-4'>
        <Link href={'/search'}>
          <Image src={searchIcon} alt='검색 아이콘' className='xl:w-9' />
        </Link>
        <Link href={'/'}>
          <Image src={headerLogo} alt='헤더 로고' className='h-[36px] w-[119px] xl:h-12 xl:w-[172px]' />
        </Link>
        <Link href={'/mypage'}>
          <Image src={userIconDark} alt='유저 아이콘' className='xl:w-9' />
        </Link>
      </header>
    );
  }
  return (
    <header className='items-between border-b-line-100 flex justify-center border-b-[1px] py-[13px] xl:h-[80px]'>
      <Link href={'/'} className='flex items-center justify-center'>
        <Image src={headerLogo} alt='헤더 로고' className='xl:h-9 xl:w-[131px]' />
      </Link>
    </header>
  );
}

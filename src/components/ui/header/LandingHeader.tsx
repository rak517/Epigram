'use client';
import Image from 'next/image';
import headerLogo from '@/assets/images/headerLogo.svg';
import userIconDark from '@/assets/icons/userIconDark.svg';
import searchIcon from '@/assets/icons/searchIcon.svg';

interface LandingHeaderProps {
  showIcon?: boolean;
}

export default function LandingHeader({ showIcon = false }: LandingHeaderProps) {
  if (showIcon) {
    return (
      <header className='flex items-center justify-between px-6 py-2 md:px-[72px] md:py-3 xl:px-[120px] xl:py-4'>
        <Image src={searchIcon} alt='검색 아이콘' className='xl:w-9' />
        <Image src={headerLogo} alt='헤더 로고' className='h-[36px] w-[119px] xl:h-12 xl:w-[172px]' />
        <Image src={userIconDark} alt='유저 아이콘' className='xl:w-9' />
      </header>
    );
  }
  return (
    <header className='items-between flex justify-center py-[13px]'>
      <Image src={headerLogo} alt='헤더 로고' className='xl:h-9 xl:w-[131px]' />
    </header>
  );
}

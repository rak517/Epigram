'use client';

import { useState } from 'react';
import { useGetUser } from '@/apis/user/queries';
import Avatar from '../avatars';
import Link from 'next/link';
import Image from 'next/image';
import menuIcon from '@/assets/icons/hamburgerMenuIcon.svg';
import headerLogo from '@/assets/images/headerLogo.svg';
import SideBar from '../sideBar';

export default function MainHeader() {
  const { data: user, isLoading } = useGetUser();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <header className='border-b-line-100 fixed top-0 right-0 left-0 z-10 flex h-13 items-center justify-between border-b-[1px] bg-white px-6 py-4 md:h-15 md:px-18 md:py-[19px] lg:h-20 lg:px-30 lg:py-6.5'>
        <div className='flex items-center justify-center gap-3 md:gap-6'>
          <Image src={menuIcon} alt='메뉴 아이콘' className='cursor-pointer md:hidden' onClick={toggleSidebar} />
          <Link href={'/'}>
            <Image src={headerLogo} alt='헤더 로고' />
          </Link>
          <Link href={'/epigrams'} className='text-black-600 md:text-md hidden font-semibold md:block lg:text-lg'>
            피드
          </Link>
          <Link href={'/search'} className='text-black-600 md:text-md hidden font-semibold md:block lg:text-lg'>
            검색
          </Link>
        </div>
        <Link href={'/mypage'} className='flex items-center gap-1.5'>
          {isLoading ? (
            <>
              <div className='h-6 w-6 animate-pulse rounded-full bg-gray-300' />
              <p className='text-sm font-medium text-gray-300'>Loading...</p>
            </>
          ) : (
            <>
              <Avatar src={user?.image} alt='프로필 이미지' className='h-6 w-6' />
              <p className='text-sm font-medium text-gray-300 lg:text-lg'>{user?.nickname}</p>
            </>
          )}
        </Link>
      </header>

      {isSidebarOpen && (
        <SideBar
          items={[
            { label: '피드', value: '/feed' },
            { label: '검색', value: '/search' },
          ]}
          isOpen={isSidebarOpen}
        />
      )}
    </>
  );
}

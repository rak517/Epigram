'use client';

import Link from 'next/link';
import SearchIcon from '@/assets/icons/searchIcon.svg';
import LeftArrowIcon from '@/assets/icons/arrow_left.svg';
import Image from 'next/image';
import Button from '@/components/ui/buttons';

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4'>
      <div className='w-full max-w-md space-y-8 text-center'>
        <h1 className='animate-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-clip-text text-9xl font-semibold text-transparent'>404</h1>

        <div className='mx-auto flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-blue-300'>
          <Image src={SearchIcon} alt='돋보기 아이콘' width={40} height={40} className='animate-pulse' />
        </div>

        <div className='space-y-4'>
          <h2 className='text-2xl font-bold'>페이지를 찾을 수 없습니다.</h2>
          <p>요청하신 페이지가 존재하지 않거나, 이동되었거나, 일시적으로 사용할 수 없습니다.</p>

          <div className='flex flex-col justify-center gap-4 pt-4 sm:flex-row'>
            <Link href='/' className='border-black-500 hover:border-black-600 text-gray-sm flex items-center justify-center rounded-xl border px-6 py-3 font-semibold text-gray-700'>
              <Image src={LeftArrowIcon} alt='좌측 화살표 아이콘' width={20} height={20} />
              홈으로 돌아가기
            </Link>
            <Button onClick={() => window.history.back()} variant='outline' className='text-gray-700'>
              이전 페이지로
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

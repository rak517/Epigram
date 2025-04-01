import { Metadata } from 'next/types';
import SignupForm from '@/components/auth/SignupForm';
import SocialButtonGroup from '@/components/auth/SocialButtonGroup';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '에피그램 회원가입',
  description: '좋은 글귀를 공유하기 위해 회원가입 해보세요!',
  openGraph: {
    images: ['/logo.png'],
  },
};

export default function Signup() {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-2 px-4'>
      <SignupForm />
      <span className='px-4 text-xs text-blue-800'>
        회원이신가요?{' '}
        <Link href='login' className='text-black-500 underline'>
          로그인하기
        </Link>
      </span>
      <SocialButtonGroup endPoint='/signup' />
    </div>
  );
}

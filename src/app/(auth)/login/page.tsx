'use client';

import LoginForm from '@/components/auth/LoginForm';
import SocialButtonGroup from '@/components/auth/SocialButtonGroup';
import { useModalStore } from '@/stores/ModalStore';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('error');
  const { openModal } = useModalStore();

  useEffect(() => {
    if (errorMessage) {
      openModal({
        type: 'alert',
        title: '오류가 발생했습니다.',
        description: errorMessage,
        callback: () => {
          router.replace('/login');
        },
      });
    }
  }, [errorMessage, openModal, router]);

  return (
    <div className='flex w-full flex-col items-center justify-center gap-2 px-4'>
      <LoginForm />
      <span className='text-xs text-blue-800'>
        회원이 아니신가요?{' '}
        <Link href='/signup' className='text-black-500 underline'>
          가입하기
        </Link>
      </span>
      <SocialButtonGroup endPoint='/login' />
    </div>
  );
}

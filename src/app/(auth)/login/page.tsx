import LoginForm from '@/components/auth/LoginForm';
import SocialButtonGroup from '@/components/auth/SocialButtonGroup';
import Link from 'next/link';

export default function Login() {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-2 px-4'>
      <LoginForm />
      <span className='text-xs text-blue-400'>
        회원이 아니신가요?{' '}
        <Link href='/signup' className='text-black-500 underline'>
          가입하기
        </Link>
      </span>
      <SocialButtonGroup />
    </div>
  );
}

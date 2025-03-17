import LoginForm from '@/components/auth/LoginForm';
import SocialButtonGroup from '@/components/auth/SocialButtonGroup';

export default function Login() {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-2 px-4'>
      <LoginForm />
      <SocialButtonGroup />
    </div>
  );
}

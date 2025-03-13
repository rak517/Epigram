import SignupForm from '@/components/auth/SignupForm';
import SocialButtonGroup from '@/components/auth/SocialButtonGroup';

export default function Signup() {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-2 px-4'>
      <SignupForm />
      <SocialButtonGroup />
    </div>
  );
}

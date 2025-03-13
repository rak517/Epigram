import Image from 'next/image';
import GoogleLogo from '@/assets/images/logo_google.svg';
import KakaoLogo from '@/assets/images/logo_kakao.svg';

export default function SocialButtonGroup() {
  return (
    <div className='w-full max-w-96 space-y-2'>
      <div className='flex w-full items-center'>
        <hr className='flex-grow border-t border-gray-200' />
        <span className='px-4 text-xs text-blue-400'>SNS 계정으로 간편 가입하기</span>
        <hr className='flex-grow border-t border-gray-200' />
      </div>
      <div className='flex w-full items-center justify-center gap-2'>
        <Image src={GoogleLogo} alt='구글 소셜 로그인' width={40} height={40} />
        <Image src={KakaoLogo} alt='카카오 소셜 로그인' width={40} height={40} />
      </div>
    </div>
  );
}

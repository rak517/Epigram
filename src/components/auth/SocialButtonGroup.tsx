'use client';

import Image from 'next/image';
import GoogleLogo from '@/assets/images/logo_google.svg';
import KakaoLogo from '@/assets/images/logo_kakao.svg';

export default function SocialButtonGroup() {
  const handleSocialLogin = (provider: 'google' | 'kakao') => {
    if (provider === 'kakao') {
      const KAKAO_OAUTH_URL =
        'https://kauth.kakao.com/oauth/authorize?client_id=' + process.env.NEXT_PUBLIC_KAKAO_API_KEY! + '&redirect_uri=' + process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI! + '&response_type=code';
      window.location.href = KAKAO_OAUTH_URL;
    } else {
      const GOOGLE_OAUTH_URL =
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&` +
        `redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&` +
        `response_type=code&` +
        `scope=openid%20profile%20email&` +
        `state=google-login-state`;
      window.location.href = GOOGLE_OAUTH_URL;
    }
  };

  return (
    <div className='w-full max-w-96 space-y-2'>
      <div className='flex w-full items-center'>
        <hr className='flex-grow border-t border-gray-200' />
        <span className='px-4 text-xs text-blue-400'>SNS 계정으로 간편 가입하기</span>
        <hr className='flex-grow border-t border-gray-200' />
      </div>
      <div className='flex w-full items-center justify-center gap-2'>
        <Image src={GoogleLogo} alt='구글 소셜 로그인' width={40} height={40} onClick={() => handleSocialLogin('google')} className='cursor-pointer' />
        <Image src={KakaoLogo} alt='카카오 소셜 로그인' width={40} height={40} onClick={() => handleSocialLogin('kakao')} className='cursor-pointer' />
      </div>
    </div>
  );
}

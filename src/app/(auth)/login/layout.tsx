import { Metadata } from 'next/types';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '에피그램 회원 로그인',
  description: '좋은 글귀를 공유하기 위해 로그인 해보세요!',
  openGraph: {
    images: ['/logo.png'],
  },
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense>{children}</Suspense>;
}

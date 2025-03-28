'use client';

import MypageProvider from '@/context/MypageProvider';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <MypageProvider>{children}</MypageProvider>;
}

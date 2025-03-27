import { PropsWithChildren } from 'react';
import MainHeader from '@/components/ui/header/MainHeader';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}

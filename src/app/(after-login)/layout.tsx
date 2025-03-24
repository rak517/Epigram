import { PropsWithChildren } from 'react';
import MainHeader from '@/components/ui/header/MainHeader';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <MainHeader />
      <main className='bg-background-100 mt-13 flex min-h-[calc(100dvh-4rem)] flex-col items-center gap-16 pb-20 md:mt-15 lg:mt-20'>
        <div className='w-[312px] space-y-16 sm:w-[384px] md:w-[640px] md:space-y-20'>{children}</div>
      </main>
    </>
  );
}

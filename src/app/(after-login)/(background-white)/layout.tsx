import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className='mt-13 flex min-h-[calc(100dvh-4rem)] flex-col items-center gap-16 bg-white pb-20 md:mt-15 lg:mt-20'>
      <div className='w-[312px] space-y-16 pt-6 md:w-[384px] md:space-y-20 md:pt-8 lg:w-[640px] lg:pt-10'>{children}</div>
    </main>
  );
}

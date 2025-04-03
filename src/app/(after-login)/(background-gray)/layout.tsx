import AddEpigramButton from '@/components/ui/buttons/AddEpigramButton';
import FloatingButton from '@/components/ui/buttons/FloatingButton';
import { ToastContainer } from '@/utils/toast/Toast';
import { ToastProvider } from '@/utils/toast/ToastContext';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ToastProvider>
      <main className='bg-background-100 mt-13 flex min-h-[calc(100dvh-4rem)] flex-col items-center gap-16 pb-20 md:mt-15 lg:mt-20'>
        <div className='w-full space-y-16 pt-6 md:space-y-20 md:pt-8 lg:pt-10'>{children}</div>
        <AddEpigramButton />
        <FloatingButton className='right-3 size-12 md:right-12' size='lg' />
      </main>
      <ToastContainer />
    </ToastProvider>
  );
}

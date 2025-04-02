import { ReactNode } from 'react';

interface EpigramCommentLayoutProps {
  children: ReactNode;
}

export default function EpigramCommentLayout({ children }: EpigramCommentLayoutProps) {
  return (
    <div className='w-full'>
      <div className='mx-auto flex w-[360px] flex-col items-center justify-center pt-8 md:w-[384px] md:pt-10 lg:w-[640px] lg:pt-12'>{children}</div>;
    </div>
  );
}

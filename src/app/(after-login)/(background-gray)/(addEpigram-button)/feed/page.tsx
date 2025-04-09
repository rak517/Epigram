import EpigramList from '@/components/feed/EpigramList';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: '에피그램 - 피드',
  description: '좋은 글귀를 공유하기 위해 로그인 해보세요!',
};

export default function Feed() {
  return (
    <div className='flex w-full flex-col items-center gap-18 lg:gap-40'>
      <div className='flex w-full max-w-[1200px] flex-col gap-18 px-6 lg:gap-40'>
        <EpigramList />
      </div>
    </div>
  );
}

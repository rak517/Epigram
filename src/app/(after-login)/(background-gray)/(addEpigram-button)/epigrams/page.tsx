import CommentList from '@/components/epigrams/CommentList';
import DailyEmotion from '@/components/epigrams/DailyEmotion';
import DailyEpigram from '@/components/epigrams/DailyEpigram';
import EpigramList from '@/components/epigrams/EpigramList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '에피그램 - 메인',
  description: '하루 한 문장으로 시작하는 영감의 순간. 당신의 에피그램을 기록하고, 다른 사람들과 공유하며 일상 속 작은 변화를 경험해보세요.',
  metadataBase: new URL('https://dailyepigram.vercel.app'),
  keywords: ['에피그램', '명언', 'Epigram', '오늘의 감정'],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/shortcut_apple.png',
    apple: '/shortcut_apple.png',
  },
  openGraph: {
    title: '에피그램 - 메인',
    description: '하루 한 문장으로 시작하는 영감의 순간. 당신의 에피그램을 기록하고, 다른 사람들과 공유하며 일상 속 작은 변화를 경험해보세요.',
    url: 'https://dailyepigram.vercel.app/epigrams',
    siteName: 'Epigram',
    images: [
      {
        url: '/meta.png',
        width: 1200,
        height: 600,
        alt: 'Epigram Main Img',
      },
    ],
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Page() {
  return (
    <div className='flex w-full flex-col items-center gap-18 lg:gap-40'>
      <div className='flex w-[312px] flex-col gap-18 md:w-[384px] lg:w-[640px] lg:gap-40'>
        <DailyEpigram />
        <DailyEmotion />
        <EpigramList />
      </div>

      <div className='w-full md:w-[384px] lg:w-[640px]'>
        <CommentList />
      </div>
    </div>
  );
}

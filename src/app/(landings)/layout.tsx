import LandingHeader from '@/components/ui/header/LandingHeader';
import SmoothScroll from '@/components/landing/SmoothScroll';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Epigram',
  description: '날마다 에피그램 하루 한 번씩 새로운 에피그램(Epigram)을 작성하고, 다른 사람들과 함께 공유함으로써 일상 속 작은 영감을 주고받는 서비스입니다.',
  metadataBase: new URL('https://dailyepigram.vercel.app'),
  keywords: ['에피그램', '명언', 'Epigram', '오늘의 감정'],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/shortcut_apple.png',
    apple: '/shortcut_apple.png',
  },
  openGraph: {
    title: 'Epigram',
    description: '날마다 에피그램 하루 한 번씩 새로운 에피그램(Epigram)을 작성하고, 다른 사람들과 함께 공유함으로써 일상 속 작은 영감을 주고받는 서비스입니다.',
    url: 'https://dailyepigram.vercel.app',
    siteName: 'Epigram',
    images: [
      {
        url: '/meta.png',
        width: 1200,
        height: 600,
        alt: 'Epigram Landing Page',
      },
    ],
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <LandingHeader showIcon />
      {children}
    </SmoothScroll>
  );
}

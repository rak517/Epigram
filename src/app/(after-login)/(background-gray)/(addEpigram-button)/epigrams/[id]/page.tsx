import EpigramComment from '@/components/epigramDetail/EpigramComment';
import EpigramContent from '@/components/epigramDetail/EpigramContent';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `에피그램 #${id} - 에피그램 상세페이지`,
    description: '하루 한 문장으로 시작하는 영감의 순간. 당신의 에피그램을 기록하고, 다른 사람들과 공유하며 일상 속 작은 변화를 경험해보세요.',
    metadataBase: new URL('https://dailyepigram.vercel.app'),
    openGraph: {
      title: `에피그램 #${id} - 에피그램 상세페이지`,
      description: '하루 한 문장으로 시작하는 영감의 순간. 당신의 에피그램을 기록하고, 다른 사람들과 공유하며 일상 속 작은 변화를 경험해보세요.',
      url: `https://dailyepigram.vercel.app/epigrams/${id}`,
      siteName: 'Epigram',
      images: [
        {
          url: '/meta.png',
          width: 1200,
          height: 630,
          alt: 'Epigram Detail Image',
        },
      ],
      type: 'website',
      locale: 'ko_KR',
    },
  };
}

export default function Page() {
  return (
    <div className='-mt-6 w-full pt-0 md:-mt-8 lg:-mt-10'>
      <EpigramContent />
      <EpigramComment />
    </div>
  );
}

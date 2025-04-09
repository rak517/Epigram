import EpigramComment from '@/components/epigramDetail/EpigramComment';
import EpigramContent from '@/components/epigramDetail/EpigramContent';
import EpigramDropdown from '@/components/epigramDetail/EpigramDropdown';
import TagsClient from '@/components/epigramDetail/TagsClient';
import TextCardServer from '@/components/ui/textcard/textcardServer';
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

const REVALIDATE_TIME = 60 * 10;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams/${id}`, {
    next: {
      revalidate: REVALIDATE_TIME,
    },
  });

  const data = await response.json();

  return (
    <div className='-mt-6 w-full pt-0 md:-mt-8 lg:-mt-10'>
      <div className='flex w-full flex-col items-center justify-center bg-[linear-gradient(white_90%,#f2f2f2)] bg-[length:100%_20px] bg-repeat pt-32 pb-1 shadow-[0px_3px_12px_0px_rgba(0,0,0,0.04)]'>
        <div className='relative h-[164px] w-[312px] text-2xl md:h-[182px] md:w-[384px] lg:h-[236px] lg:w-[640px] lg:text-3xl'>
          <TextCardServer
            variant='variableHeight'
            tagPosition='topLeft'
            hasBackground={false}
            hasBorder={false}
            authorClassName='text-base md:text-xl lg:text-2xl'
            cardContent={data?.content}
            author={data?.author}
            className='h-full w-full'
          />

          <TagsClient tags={data.tags} tagPosition='topLeft' tagClassName='text-base lg:text-xl pl-4' />
          <EpigramDropdown writerId={data.writerId} epigramId={data.id} />
        </div>

        <EpigramContent epigramId={data.id} initialLikeCount={data.likeCount} initialIsLiked={data.isLiked ?? false} referenceUrl={data.referenceUrl} />

        <div className='after:zigzag relative h-4 w-full'></div>
      </div>

      <EpigramComment />
    </div>
  );
}

import { EpigramResponse } from '@/apis/epigram/types';
import TextCard from '@/components/ui/textcard';

const REVALIDATE_TIME = 60 * 10;

export default async function DailyEpigram() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams/today`, {
    next: {
      revalidate: REVALIDATE_TIME,
    },
  });

  const epigramData: EpigramResponse = await response.json();

  return (
    <div className='flex flex-col gap-6 text-lg md:text-2xl'>
      <h2 className='text-black-600 font-semibold'>오늘의 에피그램</h2>
      <TextCard cardContent={epigramData.content} author={epigramData.author} tags={epigramData.tags} />
    </div>
  );
}

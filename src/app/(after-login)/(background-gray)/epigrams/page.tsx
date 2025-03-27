import CommentList from '@/components/epigrams/CommentList';
import DailyEmotion from '@/components/epigrams/DailyEmotion';
import DailyEpigram from '@/components/epigrams/DailyEpigram';
import EpigramList from '@/components/epigrams/EpigramList';

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

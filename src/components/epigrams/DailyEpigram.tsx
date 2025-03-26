import { Epigram } from '@/apis/epigram/types';
import TextCard from '@/components/ui/textcard';
import * as motion from 'motion/react-client';
import Link from 'next/link';
import Image from 'next/image';
import EmptyEpigram from '@/assets/images/empty_epigram.svg';

const REVALIDATE_TIME = 60 * 10;

export default async function DailyEpigram() {
  const epigramData: Epigram | null = await getDailyEpigram();

  return (
    <section className='flex flex-col gap-4 md:gap-8'>
      <h2 className='text-black-600 text-lg font-semibold md:text-2xl'>오늘의 에피그램</h2>
      {epigramData ? (
        <motion.div exit={{ opacity: 0, y: -10 }} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
          <Link href={`/epigrams/${epigramData.id}`} className='text-md cursor-pointer md:text-lg lg:text-xl xl:text-2xl'>
            <TextCard cardContent={epigramData.content} author={epigramData.author} tags={epigramData.tags} />
          </Link>
        </motion.div>
      ) : (
        <Empty />
      )}
    </section>
  );
}

async function getDailyEpigram() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams/today`, {
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });
    return await response.json();
  } catch {
    return null;
  }
}

function Empty() {
  return (
    <motion.div exit={{ opacity: 0, y: -10 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='flex flex-col items-center gap-4'>
      <Image src={EmptyEpigram} alt='빈 오늘의 에피그램' width={96} height={96} />
      <p className='text-md from-black-700 via-black-400 to-black-200 flex flex-col items-center gap-2 bg-gradient-to-r bg-clip-text text-transparent md:text-xl'>
        <span className='text-line'>오늘의 에피그램이 없어요!</span>
        <span>에피그램을 만들고 다른 사람들에게 공유할 수 있어요.</span>
      </p>
    </motion.div>
  );
}

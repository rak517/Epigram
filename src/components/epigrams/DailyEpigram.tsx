import { Epigram } from '@/apis/epigram/types';
import TextCard from '@/components/ui/textcard';
import * as motion from 'motion/react-client';
import Link from 'next/link';

const REVALIDATE_TIME = 60 * 10;

export default async function DailyEpigram() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams/today`, {
    next: {
      revalidate: REVALIDATE_TIME,
    },
  });

  const epigramData: Epigram = await response.json();

  return (
    <section className='flex flex-col gap-4 md:gap-8'>
      <h2 className='text-black-600 text-lg font-semibold md:text-2xl'>오늘의 에피그램</h2>
      <motion.div exit={{ opacity: 0, y: -10 }} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
        <Link href={`/epigrams/${epigramData.id}`} className='text-md cursor-pointer md:text-lg lg:text-xl xl:text-2xl'>
          <TextCard cardContent={epigramData.content} author={epigramData.author} tags={epigramData.tags} />
        </Link>
      </motion.div>
    </section>
  );
}

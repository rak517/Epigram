'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { useGetEpigrams } from '@/apis/epigram/queries';
import { MainEpigramButtonSkeleton, MainEpigramSkeletonList } from '@/components/ui/skeletons/EpigramCardSkeleton';
import TextCard from '@/components/ui/textcard';
import RoundedButton from '@/components/ui/buttons/roundedButton';
import { isEmpty } from 'es-toolkit/compat';
import Image from 'next/image';
import EmptyEpigram from '@/assets/images/empty_epigram.svg';

const PAGE_LIMIT = 3;

const MotionLink = motion.create(Link);

export default function EpigramList() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } = useGetEpigrams({ limit: PAGE_LIMIT });
  const epigrams = data?.pages.flatMap((page) => page.list) ?? [];
  const totalCount = data?.pages.flatMap((page) => page.totalCount)[0] ?? 0;

  const handleClick = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  return (
    <section className='flex flex-col gap-2'>
      <h2 className='text-black-600 text-lg font-semibold md:text-2xl'>최신 에피그램</h2>
      <AnimatePresence>
        <div className='flex flex-col gap-10'>
          {isLoading && (
            <>
              <MainEpigramSkeletonList count={PAGE_LIMIT} />
              <MainEpigramButtonSkeleton />
            </>
          )}

          {/* 로딩 종료 후 empty 상태 조건부 렌더링 */}
          {!isLoading && isEmpty(epigrams) ? (
            <Empty />
          ) : (
            epigrams.map((epigram) => (
              <MotionLink
                key={epigram.id}
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className='cursor-pointer'
                href={`/epigrams/${epigram.id}`}
              >
                <TextCard author={epigram.author} cardContent={epigram.content} tags={epigram.tags} />
              </MotionLink>
            ))
          )}

          {isFetchingNextPage && <MainEpigramSkeletonList count={PAGE_LIMIT} />}

          {hasNextPage && totalCount > epigrams.length && (
            <div className='flex w-full justify-center'>
              <RoundedButton type='에픽그램' size='small' onClick={handleClick} />
            </div>
          )}
        </div>
      </AnimatePresence>
    </section>
  );
}

function Empty() {
  return (
    <motion.div exit={{ opacity: 0, y: -10 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='flex flex-col items-center gap-4'>
      <Image src={EmptyEpigram} alt='빈 에피그램 리스트' width={96} height={96} />
      <p className='text-md from-black-700 via-black-400 to-black-200 flex flex-col items-center gap-2 bg-gradient-to-r bg-clip-text text-transparent md:text-xl'>
        <span className='text-line'>아직 에피그램이 없어요!</span>
        <span>에피그램을 만들고 다른 사람들에게 공유할 수 있어요.</span>
      </p>
    </motion.div>
  );
}

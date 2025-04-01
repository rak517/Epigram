'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

import TextCard from '../ui/textcard';
import RoundedButton from '../ui/buttons/roundedButton';
import Image from 'next/image';
import PlusIcon from '@/assets/icons/plus.svg';
import { isEmpty } from 'es-toolkit/compat';
import { useGetEpigrams } from '@/apis/epigram/queries';
import EmptyEpigram from '@/assets/images/empty_epigram.svg';
import { FeedEpigramButtonSkeleton, FeedEpigramSkeletonList } from '../ui/skeletons/FeedCardSkeleton';
import { useState } from 'react';
import GridIcon from '@/assets/icons/darhboard.svg';
import FlexIcon from '@/assets/icons/sort.svg';

const PAGE_LIMIT = 6;

const MotionLink = motion.create(Link);

const epigramListAnimation = {
  exit: { opacity: 0, y: -10 },
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2 },
  whileHover: { y: -8, transition: { duration: 0.2 } },
};

const LIST_LAYOUT = {
  grid: 'grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-14 lg:gap-x-10 lg:gap-y-16',
  flex: 'flex flex-col gap-8 md:gap-12 lg:gap-16',
};

export default function EpigramList() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } = useGetEpigrams({ limit: PAGE_LIMIT });
  const epigrams = data?.pages.flatMap((page) => page.list) ?? [];
  const totalCount = data?.pages.flatMap((page) => page.totalCount)[0] ?? 0;

  const [isGridDisplay, setIsGridDisplay] = useState(true);
  const layout = isGridDisplay ? LIST_LAYOUT.grid : LIST_LAYOUT.flex;

  const handleClick = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  return (
    <section className='flex flex-col gap-4 md:gap-8'>
      <div className='flex w-full items-center justify-between'>
        <h2 className='text-black-600 text-lg font-semibold md:text-2xl'>피드</h2>
        <Image
          src={isGridDisplay ? FlexIcon : GridIcon}
          alt={isGridDisplay ? 'y축 정렬 아이콘' : '표 정렬 아이콘'}
          width={36}
          height={36}
          className='size-6 cursor-pointer md:size-9'
          onClick={() => setIsGridDisplay(!isGridDisplay)}
        />
      </div>
      <>
        <div className={!isLoading && isEmpty(epigrams) ? LIST_LAYOUT.flex : layout} data-testid='feed-layout'>
          {isLoading && <FeedEpigramSkeletonList count={PAGE_LIMIT} />}

          {/* 로딩 종료 후 empty 상태 조건부 렌더링 */}
          {!isLoading && isEmpty(epigrams) ? (
            <Empty />
          ) : (
            epigrams.map((epigram) => (
              <MotionLink
                key={epigram.id}
                variants={epigramListAnimation}
                className='text-md cursor-pointer md:text-lg lg:text-xl xl:text-2xl'
                href={`/epigrams/${epigram.id}`}
                initial='initial'
                animate='animate'
                whileHover='whileHover'
                exit='exit'
                transition={epigramListAnimation.transition}
              >
                <TextCard author={epigram.author} cardContent={epigram.content} tags={epigram.tags} />
              </MotionLink>
            ))
          )}

          {isFetchingNextPage && <FeedEpigramSkeletonList count={PAGE_LIMIT} />}
        </div>
        {isLoading && <FeedEpigramButtonSkeleton />}
        {hasNextPage && totalCount > epigrams.length && (
          <div className='mt-8 flex w-full justify-center'>
            <RoundedButton onClick={handleClick} variant='outline' className='gap-2'>
              <Image src={PlusIcon} alt='에피그램 더보기' />
              에피그램 더보기
            </RoundedButton>
          </div>
        )}
      </>
    </section>
  );
}

function Empty() {
  return (
    <motion.div exit={{ opacity: 0, y: -10 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='flex flex-col items-center gap-4'>
      <Image src={EmptyEpigram} alt='빈 피드 리스트' width={96} height={96} />
      <p className='text-md from-black-700 via-black-400 to-black-200 flex flex-col items-center gap-2 bg-gradient-to-r bg-clip-text text-transparent md:text-xl'>
        <span className='text-line'>아직 피드가 없어요!</span>
        <span>에피그램을 만들고 다른 사람들에게 공유할 수 있어요.</span>
      </p>
    </motion.div>
  );
}

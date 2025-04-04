'use client';

import { useGetEpigrams } from '@/apis/epigram/queries';
import { useGetComments, useGetUser } from '@/apis/user/queries';
import TextCard from '../ui/textcard';
import { useState } from 'react';
import Comment from '../ui/comment';
import EmptyIcon from '@/assets/images/empty_epigram.svg';
import Image from 'next/image';
import Link from 'next/link';
import RoundedButton from '../ui/buttons/roundedButton';
import PlusIcon from '@/assets/icons/plus.svg';
import getTimeElapsed from '@/utils/getTimeElapsed';

export default function MyEpigramComments() {
  const [buttonTab, setButtonTab] = useState<'myEpigram' | 'myComment'>('myEpigram');

  const { data: userdata } = useGetUser();
  const userId = userdata?.id as number;

  const { data: myEpigramsData, fetchNextPage: fetchNextEpigrams, hasNextPage: hasNextEpigrams, isFetchingNextPage: isFetchingEpigrams } = useGetEpigrams({ limit: 3, writerId: userId });

  const handleLoadEpigramsButton = () => {
    if (hasNextEpigrams) {
      fetchNextEpigrams();
    }
  };

  const { data: myCommentsData, fetchNextPage: fetchNextComments, hasNextPage: hasNextComments, isFetchingNextPage: isFetchingComments } = useGetComments(userId, { limit: 4 });

  const myCommentTotalCount = myCommentsData?.pages[0].totalCount;
  const myEpigramTotalCount = myEpigramsData?.pages[0].totalCount;

  const myEpigrams = myEpigramsData?.pages.flatMap((page) => page.list) ?? [];
  const myComments = myCommentsData?.pages.flatMap((page) => page.list) ?? [];

  const handleLoadCommentsButton = () => {
    if (hasNextComments) {
      fetchNextComments();
    }
  };

  return (
    <div className='flex flex-col gap-6 md:gap-8 lg:gap-12'>
      <div className='flex gap-4 lg:gap-12'>
        <button
          onClick={() => setButtonTab('myEpigram')}
          className={`text-lg font-semibold lg:text-2xl ${buttonTab === 'myEpigram' ? 'text-black-600' : 'text-gray-300'}`}
        >{`내 에피그램(${myEpigramTotalCount ?? 0})`}</button>
        <button
          onClick={() => setButtonTab('myComment')}
          className={`text-lg font-semibold lg:text-2xl ${buttonTab === 'myComment' ? 'text-black-600' : 'text-gray-300'}`}
        >{`내 댓글(${myCommentTotalCount ?? 0})`}</button>
      </div>

      {buttonTab === 'myEpigram' && myEpigramsData ? (
        myEpigrams.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-12 md:gap-16 lg:gap-20'>
            <Image className='pb-2 md:pb-4 lg:pb-6' src={EmptyIcon} alt='내 에피그램이 없습니다.' />
            <p className='text-black-600 pb-8 text-center text-[14px] font-normal md:pb-10 lg:pb-12 lg:text-[20px]'>
              아직 작성한 에피그램이 없어요!
              <br />
              에피그램을 작성하고 감정을 공유해보세요.
            </p>
            <Link href={'/addepigram'}>
              <RoundedButton className='text-black-400 bg-background-100 border border-gray-100 px-[18px] py-3 text-[14px] font-medium lg:text-xl'>에피그램 만들기</RoundedButton>
            </Link>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center gap-12 md:gap-16 lg:gap-20'>
            {myEpigrams.map((epigram) => (
              <Link key={epigram.id} href={`/epigrams/${epigram.id}`}>
                <TextCard
                  author={epigram.author}
                  cardContent={epigram.content}
                  tags={epigram.tags}
                  tagPosition='bottomRight'
                  tagClassName='text-[14px] md:text-lg'
                  authorClassName='text-[14px] md:text-lg'
                  className='w-[312px] md:w-[384px] lg:w-[640px]'
                />
              </Link>
            ))}
            {hasNextEpigrams && (
              <RoundedButton
                className='bg-background-100 border-line-200 flex h-12 w-[153px] gap-1 border px-[18px] py-3 text-[14px] font-medium text-blue-500 lg:h-14 lg:w-[238px] lg:text-xl'
                onClick={handleLoadEpigramsButton}
                disabled={isFetchingEpigrams}
              >
                {isFetchingEpigrams ? (
                  '불러오는 중...'
                ) : (
                  <>
                    <Image src={PlusIcon} alt='더보기' />
                    에피그램 더보기
                  </>
                )}
              </RoundedButton>
            )}
          </div>
        )
      ) : buttonTab === 'myComment' && myCommentsData ? (
        myComments.length === 0 ? (
          <div className='flex h-[304px] flex-col items-center justify-center lg:h-[488px]'>
            <Image className='pb-2 md:pb-4 lg:pb-6' src={EmptyIcon} alt='내 댓글이 없습니다.' />
            <p className='text-black-600 pb-8 text-center text-[14px] font-normal md:pb-10 lg:pb-12 lg:text-[20px]'>
              아직 작성한 댓글이 없어요!
              <br />
              댓글을 달고 다른 사람들과 교류해보세요.
            </p>
            <Link href={'/epigrams'}>
              <RoundedButton className='text-black-400 bg-background-100 border border-gray-100 px-[18px] py-3 text-[14px] font-medium lg:text-xl'>에피그램 둘러보기</RoundedButton>
            </Link>
          </div>
        ) : (
          <div>
            {myComments.map((comment) => (
              <Link key={comment.id} href={`/epigrams/${comment.epigramId}`}>
                <Comment nickname={comment.writer.nickname} isOwnComment={true} content={comment.content} commentTime={getTimeElapsed(comment.createdAt)} profileImage={comment.writer.image} />
              </Link>
            ))}
            {hasNextComments && (
              <RoundedButton
                className='bg-background-100 border-line-200 mx-auto mt-14 flex h-12 w-[153px] gap-1 border px-[18px] py-3 text-[14px] font-medium text-blue-500 md:mt-10 lg:mt-18 lg:h-14 lg:w-[238px] lg:text-xl'
                onClick={handleLoadCommentsButton}
                disabled={isFetchingComments}
              >
                {isFetchingComments ? (
                  '불러오는 중...'
                ) : (
                  <>
                    <Image src={PlusIcon} alt='더보기' />
                    댓글 더보기
                  </>
                )}
              </RoundedButton>
            )}
          </div>
        )
      ) : (
        <div>로딩 중...</div>
      )}
    </div>
  );
}

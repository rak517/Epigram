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

export default function MyEpigramComments() {
  const [buttonTab, setButtonTab] = useState<'myEpigram' | 'myComment'>('myEpigram');
  const [epigramsLimit, setEpigramsLimit] = useState(3);
  const [commentsLimit, setCommentsLimit] = useState(3);

  const { data: userdata } = useGetUser();

  const handleMyCommentButton = () => {
    setButtonTab('myComment');
  };

  const handleMyEpigramButton = () => {
    setButtonTab('myEpigram');
  };

  const handleLoadCommentsButton = () => {
    setCommentsLimit((prev) => prev + 3);
  };

  const handleLoadEpigramsButton = () => {
    setEpigramsLimit((prev) => prev + 3);
  };

  const userId = userdata?.id as number;

  const { data: myEpigrams } = useGetEpigrams({ limit: epigramsLimit, writerId: userId });

  const { data: myComments } = useGetComments(userId, { limit: commentsLimit });

  console.log(myComments);
  console.log(myEpigrams);
  return (
    <div className='flex flex-col gap-6 md:gap-8 lg:gap-12'>
      <div className='flex gap-4 lg:gap-12'>
        <button onClick={handleMyEpigramButton}>{`내 에피그램(${myEpigrams?.pages[0].list.length})`}</button>
        <button onClick={handleMyCommentButton}>{`내 댓글(${myComments?.pages[0].list.length})`}</button>
      </div>
      {buttonTab === 'myEpigram' && myEpigrams !== undefined ? (
        myEpigrams.pages[0].list.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-12 md:gap-16 lg:gap-20'>
            <Image className='pb-2 md:pb-4 lg:pb-6' src={EmptyIcon} alt='내 에피그램이 없습니다.'></Image>
            <p className='text-black-600 pb-8 text-center text-[14px] font-normal md:pb-10 lg:pb-12 lg:text-[20px]'>
              아직 작성한 에피그램이 없어요!
              <br />
              에피그램을 작성하고 감정을 공유해보세요.
            </p>
            <Link href={'/addepigram'}>
              <RoundedButton className='text-black-400 lg:font-normallg:px-5 bg-background-100 border border-gray-100 px-[18px] py-3 text-[14px] font-medium lg:text-xl'>에피그램 만들기</RoundedButton>
            </Link>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center gap-12 md:gap-16 lg:gap-20'>
            {myEpigrams.pages[0].list.map((epigrams) => (
              <Link key={epigrams.id} href={`/epigrams/${epigrams.id}`}>
                <TextCard
                  author={epigrams.author}
                  cardContent={epigrams.content}
                  tags={epigrams.tags}
                  tagPosition='bottomRight'
                  tagClassName='text-[14px] md:text-lg'
                  authorClassName='text-[14px] md:text-lg'
                  className='w-[312px] md:w-[384px] lg:w-[640px]'
                />
              </Link>
            ))}
            <RoundedButton
              className='lg:font-normallg:px-5 bg-background-100 border-line-200 flex h-12 w-[153px] gap-1 border px-[18px] py-3 text-[14px] font-medium text-blue-500 lg:text-xl'
              onClick={handleLoadEpigramsButton}
            >
              <Image src={PlusIcon} alt='더보기'></Image>
              에피그램 더보기
            </RoundedButton>
          </div>
        )
      ) : buttonTab === 'myComment' && myComments !== undefined ? (
        myComments.pages[0].list.length === 0 ? (
          <div className='flex h-[304px] flex-col items-center justify-center lg:h-[488px]'>
            <Image className='pb-2 md:pb-4 lg:pb-6' src={EmptyIcon} alt='내 에피그램이 없습니다.'></Image>
            <p className='text-black-600 pb-8 text-center text-[14px] font-normal md:pb-10 lg:pb-12 lg:text-[20px]'>
              아직 작성한 댓글이 없어요!
              <br />
              대글을 달고 다른 사람들과 교류해보세요.
            </p>
            <Link href={'/epigrams'}>
              <RoundedButton className='text-black-400 lg:font-normallg:px-5 bg-background-100 border border-gray-100 px-[18px] py-3 text-[14px] font-medium lg:text-xl'>
                에피그램 둘러보기
              </RoundedButton>
            </Link>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center gap-12 md:gap-16 lg:gap-20'>
            {myComments.pages[0].list.map((comments) => (
              <Link key={comments.id} href={`/epigrams/${comments.id}`}>
                <Comment nickname={comments.writer.nickname} isOwnComment={true} content={comments.content} commentTime={comments.createdAt} profileImage={comments.writer.image}></Comment>
              </Link>
            ))}
            <RoundedButton
              className='lg:font-normallg:px-5 bg-background-100 border-line-200 flex h-12 w-[153px] gap-1 border px-[18px] py-3 text-[14px] font-medium text-blue-500 lg:text-xl'
              onClick={handleLoadCommentsButton}
            >
              <Image src={PlusIcon} alt='더보기'></Image>
              에피그램 더보기
            </RoundedButton>
          </div>
        )
      ) : (
        <div>로딩 중...</div>
      )}
    </div>
  );
}

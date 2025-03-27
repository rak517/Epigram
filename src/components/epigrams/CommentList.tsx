'use client';

import { useMemo } from 'react';
import { useCommentsQuery } from '@/apis/comment/queries';
import { useGetUser } from '@/apis/user/queries';
import { useCommentActions } from '@/hooks/useCommentActions';
import getTimeElapsed from '@/utils/getTimeElapsed';
import Comment from '../ui/comment';
import CommentsSkeleton from '../ui/skeletons/CommentLIstSkeleton';
import RoundedButton from '../ui/buttons/roundedButton';
import Image from 'next/image';
import plus_ic from '@/assets/icons/plus.svg';
import CommentEmptyState from './CommentEmptyState';

const PAGE_LIMIT = 4;

export default function CommentList() {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useCommentsQuery(PAGE_LIMIT);
  const comments = useMemo(() => data?.pages.flatMap((page) => page.list) ?? [], [data]);
  const user = useGetUser();
  const { handleEditComment, handleDelete } = useCommentActions();

  const handleMoreClick = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <CommentsSkeleton count={PAGE_LIMIT} />;
    }

    if (comments.length === 0) {
      return <CommentEmptyState />;
    }

    return (
      <div className='w-full'>
        {comments.map((comment) => {
          const isOwnComment = user.data?.id === comment.writer.id;
          return (
            <Comment
              nickname={comment.writer.nickname}
              commentTime={getTimeElapsed(comment.updatedAt)}
              content={comment.content}
              profileImage={comment.writer.image}
              isOwnComment={isOwnComment}
              onEdit={isOwnComment ? () => handleEditComment(comment) : undefined}
              onDelete={() => handleDelete(comment.id)}
              key={comment.id}
            />
          );
        })}
      </div>
    );
  };

  return (
    <section className='flex w-full flex-col gap-4 lg:gap-10'>
      <h3 className='text-black-600 pl-6 text-lg font-semibold md:pl-0 lg:text-2xl'>최신 댓글</h3>

      {renderContent()}

      {isFetchingNextPage && <CommentsSkeleton count={PAGE_LIMIT} />}
      <div className='flex justify-center'>
        {hasNextPage && (
          <RoundedButton variant='outline' onClick={handleMoreClick} className='gap-2'>
            <Image src={plus_ic} alt='최신 댓글 더보기' />
            최신 댓글 더보기
          </RoundedButton>
        )}
      </div>
    </section>
  );
}

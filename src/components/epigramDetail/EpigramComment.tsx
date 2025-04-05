'use client';

import { useGetComments } from '@/apis/epigram/queries';
import { useCommentActions } from '@/hooks/useCommentActions';
import { useParams } from 'next/navigation';
import EpigramCommentLayout from './EpigramCommentLayout';
import { useMemo, useState } from 'react';
import { Pretendard } from '@/fonts';
import { useGetUser } from '@/apis/user/queries';
import Avatar from '../ui/avatars';
import TextArea from '../ui/textarea';
import ToggleButton from '../ui/toggleBtn';
import Button from '../ui/buttons';
import CommentsSkeleton from '../ui/skeletons/CommentLIstSkeleton';
import CommentEmptyState from '../epigrams/CommentEmptyState';
import Comment from '../ui/comment';
import getTimeElapsed from '@/utils/getTimeElapsed';
import { usePostComment } from '@/apis/comment/queries';
import RoundedButton from '../ui/buttons/roundedButton';
import plus_ic from '@/assets/icons/plus.svg';
import Image from 'next/image';
import { useModalStore } from '@/stores/ModalStore';
import ProfileModal from './ProfileModal';

const PAGE_LIMIT = 3;

export default function EpigramComment() {
  const params = useParams();

  const epigramId = params?.id ? Number(params.id) : -1;

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetComments(epigramId, { limit: PAGE_LIMIT });

  const comments = useMemo(() => data?.pages.flatMap((page) => page.list) ?? [], [data]);

  const { data: user } = useGetUser();

  const { mutate } = usePostComment();

  const { handleEditComment, handleDelete } = useCommentActions();

  const [isPublic, setIsPublic] = useState(true);

  const [commentText, setCommentText] = useState('');

  const { openModal } = useModalStore();

  const handleToggle = (newState: boolean): void => {
    setIsPublic(newState);
  };

  const handleMoreClick = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderComment = () => {
    if (isLoading) {
      return <CommentsSkeleton count={PAGE_LIMIT} />;
    }

    if (comments.length === 0) {
      return <CommentEmptyState />;
    }

    return (
      <div className='w-full'>
        {comments.map((comment) => {
          const isOwnComment = user?.id === comment.writer.id;
          const handleProfileClick = () => {
            openModal({
              type: 'custom',
              size: 'sm',
              content: <ProfileModal profileImage={comment.writer.image || ''} nickname={comment.writer.nickname} />,
            });
          };

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
              onProfileClick={handleProfileClick}
              isPrivate={comment.isPrivate}
            />
          );
        })}
      </div>
    );
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    mutate(
      { epigramId: epigramId, content: commentText, isPrivate: !isPublic },
      {
        onSuccess: () => {
          setCommentText('');
        },
        onError: (error) => {
          console.error('댓글 등록 실패', error);
          openModal({
            type: 'alert',
            title: '오류',
            description: '삭제중 오류가 발생했습니다.',
            okMessage: '확인',
          });
        },
      },
    );
  };

  return (
    <EpigramCommentLayout>
      <div className='min-h-[202px] w-[312px] md:min-h-[222px] md:w-[384px] lg:min-h-[284px] lg:w-[640px]'>
        <div className={`h-[26px] text-lg font-semibold lg:h-[32px] lg:text-xl ${Pretendard.className}`}>댓글 ({data?.pages[0]?.totalCount})</div>
        <div className='flex pt-6'>
          <Avatar src={user?.image} alt={`${user?.nickname}님의 프로필 이미지`} size='default' />
          <div className='flex flex-col pl-4 lg:pl-6'>
            <TextArea
              variant='limit100'
              fontSize='responsive'
              border='blue-border'
              borderRadius='lg'
              className='h-[66px] w-[248px] md:h-[80px] md:w-[320px] lg:h-[104px] lg:w-[568px]'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className='mt-6 flex items-center justify-between'>
              <ToggleButton isSelected={isPublic} onToggle={handleToggle} size='md' label={isPublic ? '공개' : '비공개'} />
              <Button
                variant='default'
                className={`h-[32px] w-[53px] gap-2 rounded-lg px-4 text-xs font-semibold lg:text-sm ${Pretendard.className} text-white lg:h-[44px] lg:w-[60px]`}
                onClick={handleSubmitComment}
                disabled={!commentText.trim()}
              >
                저장
              </Button>
            </div>
          </div>
        </div>
        <div className='pt-3 md:pt-8 lg:pt-10'>
          {renderComment()}

          {isFetchingNextPage && <CommentsSkeleton count={PAGE_LIMIT} />}
          <div className='flex justify-center'>
            {hasNextPage && (
              <RoundedButton variant='outline' onClick={handleMoreClick} className='gap-2'>
                <Image src={plus_ic} alt='최신 댓글 더보기' />
                최신 댓글 더보기
              </RoundedButton>
            )}
          </div>
        </div>
      </div>
    </EpigramCommentLayout>
  );
}

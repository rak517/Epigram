'use client';

import { useCommentsQuery, useDeleteComment, useUpdateComment } from '@/apis/comment/queries';
import Comment from '../ui/comment';
import RoundedButton from '../ui/buttons/roundedButton';
import getTimeElapsed from '@/utils/getTimeElapsed';
import { useModalStore } from '@/stores/ModalStore';
import EditCommentModal from './EditCommentModal';
import { useGetUser } from '@/apis/user/queries';
import { getErrorMessage } from '@/utils/network/getErrorMessage';
import { Comment as CommentType, PatchComment } from '@/apis/comment/types';
import CommentsSkeleton from '../ui/skeletons/CommentLIstSkeleton';

const PAGE_LIMIT = 4;

export default function CommentList() {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useCommentsQuery(PAGE_LIMIT);
  const comments = data?.pages.flatMap((page) => page.list) ?? [];
  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();

  const user = useGetUser();

  const { openModal, closeAllModals } = useModalStore();

  const handleMoreClick = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleEditComment = (comment: CommentType) => {
    openModal({
      type: 'custom',
      content: (
        <EditCommentModal
          initialContent={comment.content}
          commentId={comment.id}
          onSave={async (data: { commentId: number; patchData: PatchComment }) => {
            try {
              updateComment.mutateAsync(data);
              openModal({
                type: 'alert',
                title: '수정 성공',
                description: '댓글 수정에 성공했습니다.',
                callback: closeAllModals,
              });
            } catch (err) {
              openModal({
                type: 'alert',
                title: '댓글 수정 실패',
                callback: () => getErrorMessage(err),
              });
              getErrorMessage(err);
            }
          }}
        />
      ),
      size: 'md',
    });
  };

  const handleDelete = (commentId: number) => {
    openModal({
      type: 'confirm',
      title: '정말 삭제하시겠습니까?',
      callback: async () => {
        try {
          deleteComment.mutateAsync(commentId);
          openModal({
            type: 'alert',
            title: '삭제 성공',
            description: '댓글을 삭제했습니다.',
            callback: closeAllModals,
          });
        } catch (err) {
          openModal({
            type: 'alert',
            title: '삭제실패',
            callback: () => getErrorMessage(err),
          });
        }
      },
    });
  };

  return (
    <section className='flex w-full flex-col gap-4 lg:gap-10'>
      <h3 className='text-black-600 pl-6 text-lg font-semibold md:pl-0 lg:text-2xl'>최신 댓글</h3>
      {isLoading ? (
        <CommentsSkeleton />
      ) : (
        <div className='w-full'>
          {comments.map((comment) => {
            const isOwnComment = user.data?.id === comment.writer.id;
            return (
              <div key={comment.id}>
                <Comment
                  nickname={comment.writer.nickname}
                  commentTime={getTimeElapsed(comment.updatedAt)}
                  content={comment.content}
                  profileImage={comment.writer.image}
                  isOwnComment={isOwnComment}
                  onEdit={isOwnComment ? () => handleEditComment(comment) : undefined}
                  onDelete={() => handleDelete(comment.id)}
                />
              </div>
            );
          })}
        </div>
      )}
      {isFetchingNextPage && <CommentsSkeleton />}
      <div className='flex justify-center'>
        <RoundedButton type='더보기' size='small' onClick={handleMoreClick} />
      </div>
    </section>
  );
}

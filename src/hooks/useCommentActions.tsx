import { useDeleteComment, useUpdateComment } from '@/apis/comment/queries';
import { useModalStore } from '@/stores/ModalStore';
import { useCallback } from 'react';
import { Comment as CommentType, PatchComment } from '@/apis/comment/types';
import EditCommentModal from '@/components/epigrams/EditCommentModal';
import { getErrorMessage } from '@/utils/network/getErrorMessage';

export function useCommentActions() {
  const { openModal, closeAllModals } = useModalStore();
  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();

  const handleEditComment = useCallback(
    (comment: CommentType) => {
      openModal({
        type: 'custom',
        content: (
          <EditCommentModal
            initialContent={comment.content}
            commentId={comment.id}
            onSave={async (data: { commentId: number; patchData: PatchComment }) => {
              try {
                await updateComment.mutateAsync(data);
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
                  description: getErrorMessage(err),
                  callback: closeAllModals,
                });
              }
            }}
          />
        ),
        size: 'md',
      });
    },
    [openModal, updateComment, closeAllModals],
  );

  const handleDelete = useCallback(
    (commentId: number) => {
      openModal({
        type: 'confirm',
        title: '정말 삭제하시겠습니까?',
        callback: async () => {
          try {
            await deleteComment.mutateAsync(commentId);
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
              description: getErrorMessage(err),
              callback: closeAllModals,
            });
          }
        },
      });
    },
    [openModal, deleteComment, closeAllModals],
  );

  return { handleEditComment, handleDelete };
}

import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { Comment, CommentForm, CommentsResponse, PatchComment } from './types';
import { safeResponse } from '@/utils/network/safeResponse';
import { commentSchema, commentsResponseSchema } from './schemas';

/**
 *
 * comment 생성
 * https://fe-project-epigram-api.vercel.app/docs/#/Comment/CreateComment
 */
export const postComment = async (commentForm: CommentForm) => {
  const response = await axiosClientHelper.post<Comment>('/comments', commentForm);
  return safeResponse(response.data, commentSchema);
};

/**
 * comments 목록 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/Comment/ListComments
 */
export const getComments = async (limit: number, cursor?: number) => {
  const params: { limit: number; cursor?: number } = { limit };
  if (cursor !== undefined) {
    params.cursor = cursor;
  }
  const response = await axiosClientHelper.get<CommentsResponse>('/comments', {
    params,
  });
  return safeResponse(response.data, commentsResponseSchema);
};

/**
 * comment 수정
 * https://fe-project-epigram-api.vercel.app/docs/#/Comment/UpdateComment
 */
export const patchComment = async (commentId: number, patchComment: PatchComment) => {
  const response = await axiosClientHelper.patch<PatchComment>(`/comments/${commentId}`, patchComment);
  return safeResponse(response.data, commentSchema);
};

/**
 * comment 삭제
 * https://fe-project-epigram-api.vercel.app/docs/#/Comment/DeleteComment
 */
export const deleteComment = async (commentId: number) => {
  await axiosClientHelper.delete<{ id: number }>(`/comments/${commentId}`);
};

import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment, getComments, patchComment, postComment } from '.';
import { CommentForm, CommentsResponse, PatchComment } from './types';

export const useCommentsQuery = (limit: number) => {
  return useInfiniteQuery<CommentsResponse, Error, InfiniteData<CommentsResponse>, [string, number], number | undefined>({
    queryKey: ['comments', limit],
    queryFn: ({ pageParam = undefined }) => getComments(limit, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    initialPageParam: undefined,
  });
};

export const usePostComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: CommentForm) => postComment(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['epigramComments'] });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { commentId: number; patchData: PatchComment }) => patchComment(data.commentId, data.patchData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['epigramComments'] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['epigramComments'] });
    },
  });
};

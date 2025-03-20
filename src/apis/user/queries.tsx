import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getComments, getDetailUser, getUser, patchUser } from '.';
import { PatchUser, User } from './types';
import { GetCommentsParams } from '../epigram/types';

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });
};

export const usePatchUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: PatchUser) => {
      return patchUser(user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useGetDetailUser = (userId: User['id']) => {
  return useQuery({
    queryKey: ['userDetail', userId],
    queryFn: () => getDetailUser(userId),
  });
};

export const useGetComments = (userId: User['id'], commentsParams: GetCommentsParams) => {
  return useInfiniteQuery({
    queryKey: ['userComments'],
    queryFn: ({ pageParam }) => getComments(userId, { ...commentsParams, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};

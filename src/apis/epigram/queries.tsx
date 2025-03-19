import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Epigram, EpigramForm, GetCommentsParams, GetEpigramsParams, PatchEpigram } from './types';
import { deleteEpigram, deleteEpigramFavorite, getComments, getEpigram, getEpigrams, patchEpigram, postEpigram, postEpigramFavorite } from '.';

export const usePostEpigram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (epigramForm: EpigramForm) => {
      return postEpigram(epigramForm);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['epigrams'] });
    },
  });
};

export const useGetEpigrams = (epigramsParams: GetEpigramsParams) => {
  return useInfiniteQuery({
    queryKey: ['epigrams', epigramsParams],
    queryFn: ({ pageParam }) => getEpigrams({ ...epigramsParams, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};

export const useGetEpigram = (epigramId: Epigram['id']) => {
  return useQuery({
    queryKey: ['epigram', epigramId],
    queryFn: () => getEpigram(epigramId),
  });
};

export const usePatchEpigram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ epigramId, epigram }: { epigramId: Epigram['id']; epigram: PatchEpigram }) => {
      return patchEpigram(epigramId, epigram);
    },
    onSuccess: (epigram) => {
      queryClient.invalidateQueries({ queryKey: ['epigram', epigram.id] });
      queryClient.invalidateQueries({ queryKey: ['epigrams'] });
    },
  });
};

export const useDeleteEpigram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (epigramId: Epigram['id']) => {
      return deleteEpigram(epigramId);
    },
    onSuccess: (epigram) => {
      queryClient.invalidateQueries({ queryKey: ['epigram', epigram.id] });
      queryClient.invalidateQueries({ queryKey: ['epigrams'] });
    },
  });
};

export const usePostEpigramFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (epigramId: Epigram['id']) => {
      return postEpigramFavorite(epigramId);
    },
    onSuccess: (epigram) => {
      queryClient.invalidateQueries({ queryKey: ['epigram', epigram.id] });
    },
  });
};

export const useDeleteEpigramFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (epigramId: Epigram['id']) => {
      return deleteEpigramFavorite(epigramId);
    },
    onSuccess: (epigram) => {
      queryClient.invalidateQueries({ queryKey: ['epigram', epigram.id] });
    },
  });
};

export const useGetComments = (epigramId: Epigram['id'], commentsParams: GetCommentsParams) => {
  return useInfiniteQuery({
    queryKey: ['epigramComments'],
    queryFn: ({ pageParam }) => getComments(epigramId, { ...commentsParams, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};

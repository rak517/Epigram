import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Epigram, EpigramForm, GetCommentsParams, GetEpigramsParams, MutationContext, PatchEpigram } from './types';
import { deleteEpigram, deleteEpigramFavorite, getComments, getEpigram, getEpigrams, patchEpigram, postEpigram, postEpigramFavorite } from '.';
import { useToast } from '@/utils/toast/ToastContext';
import { useRouter } from 'next/navigation';

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

export const useGetEpigram = (epigramId?: Epigram['id']) => {
  return useQuery({
    queryKey: ['epigram', epigramId],
    queryFn: () => getEpigram(epigramId!),
    enabled: epigramId !== undefined,
    retry: false,
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
  const { showToast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: (epigramId: Epigram['id']) => {
      return deleteEpigram(epigramId);
    },
    onSuccess: () => {
      router.push('/');
      showToast('에피그램이 성공적으로 삭제되었습니다.', 'success', '삭제 완료');
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
    onMutate: async (epigramId: Epigram['id']) => {
      await queryClient.cancelQueries({ queryKey: ['epigram', epigramId] });

      const previousEpigram = await queryClient.getQueryData(['epigram', epigramId]);

      queryClient.setQueryData<Epigram>(['epigram', epigramId], (old) => {
        if (!old) return old;
        return {
          ...old,
          isLiked: true,
          likeCount: old.likeCount + 1,
        };
      });

      return { previousEpigram };
    },

    onError: (err: Error, epigramId: number, context: unknown) => {
      if (context && typeof context === 'object' && 'previousEpigram' in context) {
        const typedContext = context as MutationContext;
        if (typedContext.previousEpigram) {
          queryClient.setQueryData<Epigram>(['epigram', epigramId], typedContext.previousEpigram);
        }
      }
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
    onMutate: async (epigramId: Epigram['id']): Promise<MutationContext> => {
      await queryClient.cancelQueries({ queryKey: ['epigram', epigramId] });

      const previousEpigram = queryClient.getQueryData<Epigram>(['epigram', epigramId]);

      queryClient.setQueryData<Epigram | undefined>(['epigram', epigramId], (old) => {
        if (!old) return old;
        return {
          ...old,
          isLiked: false,
          likeCount: Math.max(0, old.likeCount - 1),
        };
      });

      return { previousEpigram };
    },

    onError: (err: Error, epigramId: number, context: unknown) => {
      if (context && typeof context === 'object' && 'previousEpigram' in context) {
        const typedContext = context as MutationContext;
        if (typedContext.previousEpigram) {
          queryClient.setQueryData<Epigram>(['epigram', epigramId], typedContext.previousEpigram);
        }
      }
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

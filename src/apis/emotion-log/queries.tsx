import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMonthlyEmotionLogs, getTodayEmotionLog, postTodayEmotionLog } from '.';
import { EmotionRequset, GetMonthlyEmotionLogs, TodayEmotionLogs } from './types';
import { User } from '@/apis/user/types';

export const useGetTodayEmotionLog = (userId: User['id']) => {
  return useQuery({
    queryKey: ['todayEmotionLog', userId],
    queryFn: () => getTodayEmotionLog(userId),
  });
};

export const usePostTodayEmotionLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: EmotionRequset) => {
      return postTodayEmotionLog(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todayEmotionLog'] });
    },
  });
};

export const useGetMonthlyEmotionLogs = (params: GetMonthlyEmotionLogs) => {
  return useQuery({
    queryKey: ['month', params],
    queryFn: () => getMonthlyEmotionLogs(params),
  });
};

export const useOptimisticEmotionLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ params }: { params: EmotionRequset; userId: User['id'] }) => {
      return postTodayEmotionLog(params);
    },
    onMutate: async ({ params, userId }: { params: EmotionRequset; userId: User['id'] }) => {
      const previousData: TodayEmotionLogs = queryClient.getQueryData(['todayEmotionLog', userId])!;
      await queryClient.cancelQueries({ queryKey: ['todayEmotionLog'] });

      queryClient.setQueryData(['todayEmotionLog', userId], {
        ...previousData,
        emotion: params.emotion,
      });
      return previousData;
    },
    onError: (error, variables, context) => {
      if (context) {
        queryClient.setQueryData(['todayEmotionLog'], context);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todayEmotionLog'] });
    },
  });
};

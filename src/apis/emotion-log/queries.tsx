import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { getMonthlyEmotionLogs, getTodayEmotionLog, postTodayEmotionLog } from '.';
import { EmotionRequset, GetMonthlyEmotionLogs, MonthlyEmotionLogs, TodayEmotionLogs } from './types';
import { User } from '../user/types';

export const useGetTodayEmotionLog = (userId: User['id'] | undefined, options?: Omit<UseQueryOptions<TodayEmotionLogs | null>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['todayEmotionLog'],
    queryFn: () => {
      return getTodayEmotionLog(userId);
    },
    ...options,
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
      queryClient.invalidateQueries({ queryKey: ['month'] });
    },
  });
};

export const useGetMonthlyEmotionLogs = (params: GetMonthlyEmotionLogs, options?: Omit<UseQueryOptions<MonthlyEmotionLogs>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['month', params],
    queryFn: () => getMonthlyEmotionLogs(params),
    ...options,
  });
};

export const useOptimisticEmotionLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: EmotionRequset) => {
      return postTodayEmotionLog(params);
    },
    onMutate: async (params: EmotionRequset) => {
      const previousData: TodayEmotionLogs = queryClient.getQueryData(['todayEmotionLog'])!;
      await queryClient.cancelQueries({ queryKey: ['todayEmotionLog'] });

      queryClient.setQueryData(['todayEmotionLog'], {
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
      queryClient.invalidateQueries({ queryKey: ['month'] });
    },
  });
};

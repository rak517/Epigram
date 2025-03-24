import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMonthlyEmotionLogs, getTodayEmotionLog, postTodayEmotionLog } from '.';
import { EmotionRequset, GetMonthlyEmotionLogs, TodayEmotionLogs } from './types';
import { getUser } from '@/apis/user';

export const useGetTodayEmotionLog = () => {
  return useQuery({
    queryKey: ['todayEmotionLog'],
    queryFn: async () => {
      const user = await getUser();
      return await getTodayEmotionLog(user.id);
    },
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
    },
  });
};

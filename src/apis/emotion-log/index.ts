import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { EmotionRequset, GetMonthlyEmotionLogs, MonthlyEmotionLogs, TodayEmotionLogs } from './types';
import { safeResponse } from '@/utils/network/safeResponse';
import { monthlyEmotionLogsSchema, todayEmotionLogsSchema } from './schemas';

/**
 * 오늘의 감정 저장
 * https://fe-project-epigram-api.vercel.app/docs/#/emotionLogs/today
 */

export const postTodayEmotionLog = async (params: EmotionRequset) => {
  const response = await axiosClientHelper.post<TodayEmotionLogs>('/emotionLogs/today', { ...params });
  return safeResponse(response.data, todayEmotionLogsSchema);
};

/**
 * 오늘의 감정 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/emotionLogs/today
 */

export const getTodayEmotionLog = async (userId: number | undefined) => {
  const response = await axiosClientHelper.get<TodayEmotionLogs>('/emotionLogs/today', {
    params: { userId },
  });
  if (response.status === 204) {
    return null;
  }
  return safeResponse(response.data, todayEmotionLogsSchema);
};

/**
 * 월별 감정 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/emotionLogs/monthly
 */

export const getMonthlyEmotionLogs = async (monthlyEmotionLogsParams: GetMonthlyEmotionLogs) => {
  const response = await axiosClientHelper.get<MonthlyEmotionLogs>('/emotionLogs/monthly', {
    params: monthlyEmotionLogsParams,
  });
  return safeResponse(response.data, monthlyEmotionLogsSchema);
};

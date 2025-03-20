import { z } from 'zod';
import { EMOTION_STATUS } from '@/constants/emotions';
import {  emotionRequest, getMonthlyEmotionLogsSchema, monthlyEmotionLogsSchema, todayEmotionLogsSchema } from './schemas';

export type Emotion = (typeof EMOTION_STATUS)[number];

export type MonthlyEmotionLogs = z.infer<typeof monthlyEmotionLogsSchema>

export type TodayEmotionLogs = z.infer<typeof todayEmotionLogsSchema>

export type GetMonthlyEmotionLogs = z.infer<typeof getMonthlyEmotionLogsSchema>

export type EmotionRequset = z.infer<typeof emotionRequest>
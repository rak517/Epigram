import { z } from 'zod';

export const emotionEnum = z.enum(['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY']);

export const monthlyEmotionLogsSchema = z.array(
  z.object({
    createdAt: z.string(),
    emotion: emotionEnum,
    userId: z.number(),
    id: z.number(),
  }),
);

export const todayEmotionLogsSchema = z.object({
  createdAt: z.string(),
  emotion: emotionEnum,
  userId: z.number(),
  id: z.number(),
});

export const getMonthlyEmotionLogsSchema = z.object({
  userId: z.number(),
  year: z.number(),
  month: z.number(),
});

export const emotionRequest = z.object({
  emotion: emotionEnum,
});

export const emotionChartDataSchema = z.object({
  emotion: emotionEnum,
  emotionColor: z.string(),
  percent: z.number(),
});

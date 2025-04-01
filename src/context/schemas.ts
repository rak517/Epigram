import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';

export const emotionEnum = z.enum(['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY']);
export const emotionKr = z.enum(['감동', '기쁨', '고민', '슬픔', '화남']);

export const mypageContextSchema = z.object({
  currentDate: z.union([z.custom<Dayjs>((val) => val instanceof dayjs), z.null()]),
  setCurrentDate: z
    .function()
    .args(z.custom<Dayjs>((val) => val instanceof dayjs))
    .returns(z.void()),

  userEmotion: z.array(
    z.object({
      userId: z.number(),
      createdAt: z.string(),
      id: z.number(),
      emotion: emotionEnum,
    }),
  ),
  user: z.object({
    image: z.union([z.string(), z.undefined(), z.null()]),
    createdAt: z.string(),
    updatedAt: z.string(),
    teamId: z.union([z.string(), z.undefined()]),
    nickname: z.string().min(1).max(30),
    id: z.number(),
  }),
});

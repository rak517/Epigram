import { z } from 'zod';

export const userSchema = z.object({
  image: z.union([z.string(), z.null()]),
  updatedAt: z.string(),
  createdAt: z.string(),
  nickname: z.string(),
  teamId: z.union([z.string(), z.undefined()]),

  id: z.number(),
  email: z.union([z.string(), z.undefined()]),
});

export const userResponseSchema = z.object({
  user: userSchema,
});

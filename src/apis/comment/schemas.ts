import { z } from 'zod';

export const commentSchema = z.object({
  epigramId: z.number(),
  writer: z.object({
    image: z.string().nullable(),
    nickname: z.string(),
    id: z.number(),
  }),
  updatedAt: z.string(),
  createdAt: z.string(),
  isPrivate: z.boolean(),
  content: z.string().min(1),
  id: z.number(),
});

export const commentFormSchema = z.object({
  epigramId: z.number(),
  isPrivate: z.boolean(),
  content: z.string().trim().min(1),
});

export const getCommentsParamsSchema = z.object({
  totalCount: z.number(),
  nextCursor: z.number().nullable(),
  list: z.array(commentSchema),
});

export const patchCommentSchema = z.object({
  isPrivate: z.boolean(),
  content: z.string().trim().min(1),
});

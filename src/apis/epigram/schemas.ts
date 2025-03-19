import { z } from 'zod';

export const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const epigramResponseSchema = z.object({
  likeCount: z.number(),
  id: z.number(),
  content: z.string(),
  author: z.string(),
  referenceTitle: z.string(),
  referenceUrl: z.string(),
  writerId: z.number(),
  tags: z.array(tagSchema),
});

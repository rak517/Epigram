import { z } from 'zod';

export const tagSchema = z.object({
  id: z.number(),
  name: z.string().max(10, '태그는 최대 10글자까지 가능합니다.'),
});

export const epigramSchema = z.object({
  likeCount: z.number(),
  id: z.number(),
  content: z.string(),
  author: z.string(),
  referenceTitle: z.string(),
  referenceUrl: z.string(),
  writerId: z.number(),
  tags: z.array(tagSchema),
  isLiked: z.boolean().optional(),
});

export const epigramFormSchema = z.object({
  tags: z.array(tagSchema).max(3, '태그는 최대 3개입니다.'),
  referenceUrl: z.string().trim(),
  referenceTitile: z.string().trim(),
  author: z.string().trim().max(50, '50자 이내로 입력해주세요.'),
  content: z.string().trim().min(1, '내용을 입력해주세요.'),
});

export const getEpigramsParamsSchema = z.object({
  limit: z.number(),
  cursor: z.number().optional(),
  keyword: z.string().optional(),
  writerId: z.number().optional(),
});

export const patchEpigramSchema = epigramFormSchema.partial();

export const getCommentsParamsSchema = z.object({
  limit: z.number(),
  cursor: z.number().optional(),
});

//TODO: comment API 작업이 완료되면 하위 수정할 예정입니다.
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
  content: z.string(),
  id: z.number(),
});

export const commentsResponseSchema = z.object({
  totalCount: z.number(),
  nextCursor: z.number().nullable(),
  list: z.array(commentSchema),
});

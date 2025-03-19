import { z } from 'zod';
import {
  commentSchema,
  commentsResponseSchema,
  epigramFormSchema,
  epigramSchema,
  epigramsResponseSchema,
  getCommentsParamsSchema,
  getEpigramsParamsSchema,
  patchEpigramSchema,
  tagSchema,
} from './schemas';

export type Tag = z.infer<typeof tagSchema>;

export type Epigram = z.infer<typeof epigramSchema>;

export type EpigramForm = z.infer<typeof epigramFormSchema>;

export type GetEpigramsParams = z.infer<typeof getEpigramsParamsSchema>;

export type PatchEpigram = z.infer<typeof patchEpigramSchema>;

export type GetCommentsParams = z.infer<typeof getCommentsParamsSchema>;

export type EpigramsResponse = z.infer<typeof epigramsResponseSchema>;

//TODO: comment API 작업이 완료되면 하위 수정할 예정입니다.
export type CommentSchema = z.infer<typeof commentSchema>;

export type CommentsResponse = z.infer<typeof commentsResponseSchema>;

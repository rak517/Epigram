import { z } from 'zod';
import { epigramFormSchema, epigramSchema, epigramsResponseSchema, getCommentsParamsSchema, getEpigramsParamsSchema, patchEpigramSchema, tagSchema } from './schemas';

export type Tag = z.infer<typeof tagSchema>;

export type Epigram = z.infer<typeof epigramSchema>;

export type EpigramForm = z.infer<typeof epigramFormSchema>;

export type GetEpigramsParams = z.infer<typeof getEpigramsParamsSchema>;

export type PatchEpigram = z.infer<typeof patchEpigramSchema>;

export type GetCommentsParams = z.infer<typeof getCommentsParamsSchema>;

export type EpigramsResponse = z.infer<typeof epigramsResponseSchema>;

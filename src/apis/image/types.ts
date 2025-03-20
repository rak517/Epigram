import { z } from 'zod';
import { imageUploadResponseSchema, imageUploadSchema } from './schemas';

export type ImageUpload = z.infer<typeof imageUploadSchema>;

export type ImageUploadResponse = z.infer<typeof imageUploadResponseSchema>;

import { z } from 'zod';

export const imageUploadSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/x-icon', 'image/vnd.microsoft.icon'].includes(file.type), {
      message: 'jpeg, jpg, png, ico 파일만 가능합니다.',
    })
    .refine((file) => file.size < 5 * 1024 * 1024, { message: '5MB 이하의 파일만 가능합니다.' }),
});

export const imageUploadResponseSchema = z.object({
  url: z.string(),
});

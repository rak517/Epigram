import { z } from 'zod';

export const MakeEpigramFormSchema = z.object({
  content: z.string().min(1, '내용을 입력해주세요.').max(500, '500자를 초과할 수 없습니다'),
  authorType: z.enum(['direct', 'unknown', 'myself']),
  author: z.string().optional().pipe(z.string().min(1, '저자 이름을 입력해주세요').optional()),
  referenceTitle: z.string().optional(),
  referenceUrl: z
    .union([z.literal(''), z.string()])
    .optional()
    .refine((url) => !url || /^https:\/\/.+/i.test(url), {
      message: 'URL은 https:// 로 시작해야 합니다.',
    }),

  tags: z.array(z.string()).default([]),
});

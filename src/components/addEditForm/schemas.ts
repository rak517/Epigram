import { z } from 'zod';

export const MakeEpigramFormSchema = z.object({
  content: z.string().min(1, '내용을 입력해주세요.').max(500, '500자를 초과할 수 없습니다'),
  authorType: z.enum(['direct', 'unknown', 'self']),
  authorName: z.string().optional().pipe(z.string().min(1, '저자 이름을 입력해주세요').optional()),
  sourceTitle: z.string().optional(),
  sourceUrl: z.union([z.literal(''), z.string().url('올바른 URL 형식이 아닙니다')]).optional(),
});

import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().min(1, '이메일은 필수 입력입니다.').email('이메일 형식으로 작성해 주세요.'),
});

import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().min(1, '이메일은 필수 입력입니다.').email(),
});

import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().min(1, '이메일은 필수 입력입니다.').email('이메일 형식으로 작성해 주세요.'),
  nickname: z.string().min(1, '닉네임은 필수 입력입니다.').max(20, '닉네임은 최대 20자까지 가능합니다.'),
  password: z.string().min(1, '비밀번호는 필수 입력입니다.'),
});

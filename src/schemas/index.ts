import { z } from 'zod';

export const signupSchema = z
  .object({
    email: z.string().min(1, '이메일은 필수 입력입니다.').email('이메일 형식으로 작성해 주세요.'),
    nickname: z.string().min(1, '닉네임은 필수 입력입니다.').max(20, '닉네임은 최대 20자까지 가능합니다.'),
    password: z
      .string()
      .min(1, '비밀번호는 필수 입력입니다.')
      .min(8, '비밀번호는 최소 8자 이상입니다.')
      .refine(
        (value) => {
          const hasNumber = /[0-9]/.test(value);
          const hasaAphabet = /[a-zA-Z]/.test(value);
          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
          return hasNumber && hasaAphabet && hasSpecialChar;
        },
        {
          message: '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.',
        },
      ),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export const userSchema = z.object({
  image: z.union([z.string(), z.null()]),
  updatedAt: z.string(),
  createdAt: z.string(),
  nickname: z.string(),
  id: z.number(),
  email: z.string(),
});

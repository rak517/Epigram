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
    passwordConfirmation: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  });

export const loginSchema = z.object({
  email: z.string().min(1, '이메일은 필수 입력입니다.').email('이메일 형식으로 작성해 주세요.'),
  password: z.string().min(1, '비밀번호는 필수 입력입니다.'),
});

export const MakeEpigramFormSchema = z.object({
  content: z.string().min(1, '내용을 입력해주세요.').max(500, '500자를 초과할 수 없습니다'),
  authorType: z.enum(['direct', 'unknown', 'self']),
  authorName: z.string().optional().pipe(z.string().min(1, '저자 이름을 입력해주세요').optional()),
  sourceTitle: z.string().optional(),
  sourceUrl: z.union([z.literal(''), z.string().url('올바른 URL 형식이 아닙니다')]).optional(),
});

import { z } from 'zod';
import { loginSchema, signupSchema, userSchema } from '@/schemas';
import { EMOTION_STATUS } from '@/constants/emotions';

export type SignupForm = z.infer<typeof signupSchema>;

export type User = z.infer<typeof userSchema>;

export type LoginForm = z.infer<typeof loginSchema>;

export interface Tag {
  id: number;
  name: string;
}
export type Emotion = (typeof EMOTION_STATUS)[number];

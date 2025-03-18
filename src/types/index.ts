import { z } from 'zod';
import { loginSchema, signupSchema, userSchema } from '@/schemas';

export type SignupForm = z.infer<typeof signupSchema>;

export type User = z.infer<typeof userSchema>;

export type LoginForm = z.infer<typeof loginSchema>;

import { z } from 'zod';
import { loginSchema, signupSchema } from './schemas';

export type SignupForm = z.infer<typeof signupSchema>;

export type LoginForm = z.infer<typeof loginSchema>;

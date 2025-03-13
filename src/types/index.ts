import { z } from 'zod';
import { signupSchema, userSchema } from '@/schemas';

export type SignupForm = z.infer<typeof signupSchema>;

export type User = z.infer<typeof userSchema>;

import { z } from 'zod';
import { signupSchema } from '@/schemas';

export type SignupForm = z.infer<typeof signupSchema>;

import { z } from 'zod';
import { epigramResponseSchema, loginSchema, signupSchema, tagSchema, userSchema } from '@/schemas';

export type SignupForm = z.infer<typeof signupSchema>;

export type User = z.infer<typeof userSchema>;

export type LoginForm = z.infer<typeof loginSchema>;

export type Tag = z.infer<typeof tagSchema>;

export type EpigramResponse = z.infer<typeof epigramResponseSchema>;

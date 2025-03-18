import { z } from 'zod';
import { epigramResponseSchema, loginSchema, signupSchema, tagSchema, userSchema } from '@/schemas';
import { EMOTION_STATUS } from '@/constants/emotions';

export type SignupForm = z.infer<typeof signupSchema>;

export type User = z.infer<typeof userSchema>;

export type LoginForm = z.infer<typeof loginSchema>;

export type Emotion = (typeof EMOTION_STATUS)[number];

export type Tag = z.infer<typeof tagSchema>;

export type EpigramResponse = z.infer<typeof epigramResponseSchema>;

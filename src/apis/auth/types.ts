import { z } from 'zod';
import { loginSchema, MakeEpigramFormSchema, signupSchema } from './schemas';

export type SignupForm = z.infer<typeof signupSchema>;

export type LoginForm = z.infer<typeof loginSchema>;

export type MakeEpigramForm = z.infer<typeof MakeEpigramFormSchema>;

export interface MakeEpigramApiRequest {
  tags: string[];
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
}

import { FormHTMLAttributes, ReactNode } from 'react';
import { MakeEpigramFormSchema } from './schemas';
import { z } from 'zod';

export interface AddEditEpigramFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  className?: string;
}

export type MakeEpigramForm = z.infer<typeof MakeEpigramFormSchema>;

export interface MakeEpigramApiRequest {
  tags: string[];
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
}

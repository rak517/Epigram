import { FormHTMLAttributes, ReactNode } from 'react';
import { UseFormRegister, FieldErrors, UseFormTrigger } from 'react-hook-form';
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

export type FormValues = {
  content: string;
  author: string;
  source: string;
  tags: string[];
};

export interface ContentProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  trigger: UseFormTrigger<FormValues>;
}
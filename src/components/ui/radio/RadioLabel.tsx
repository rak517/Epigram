'use client';

import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface RadioLabelProps extends HTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  children: ReactNode;
}

export function RadioLabel({ htmlFor, children, className, ...props }: RadioLabelProps) {
  return (
    <label htmlFor={htmlFor} className={cn('text-black-600 cursor-pointer font-medium', className)} {...props}>
      {children}
    </label>
  );
}

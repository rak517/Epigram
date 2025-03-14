'use client';

import { cva } from 'class-variance-authority';
import { InputHTMLAttributes, useContext } from 'react';
import { RadioGroupContext } from './RadioGroup';
import { cn } from '@/utils/cn';

const radioGroupItemVariants = cva('relative flex items-center justify-center rounded-full border border-blue-300 border-2', {
  variants: {
    radioSize: {
      sm: 'w-5 h-5',
      md: 'w-6 h-6',
    },
  },
  defaultVariants: {
    radioSize: 'md',
  },
});

export interface RadioGroupItemProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  radioSize?: 'sm' | 'md';
  id: string;
}

export function RadioGroupItem({ value, radioSize = 'md', id, className, ...props }: RadioGroupItemProps) {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error('RadioGroupItem은 RadioGroup 내에서 사용해야 합니다.');
  }

  const { name, value: selectedValue, onChange } = context;
  const checked = selectedValue === value;

  return (
    <>
      <input type='radio' id={id} name={name} value={value} checked={checked} onChange={() => onChange(value)} className='hidden' {...props} />
      <div onClick={() => onChange(value)} className={cn(radioGroupItemVariants({ radioSize }), className)}>
        {checked && <div className='h-3 w-3 rounded-full bg-blue-800' />}
      </div>
    </>
  );
}

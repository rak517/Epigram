import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  cn(
    'flex items-center justify-center rounded-full border whitespace-nowrap transition hover:scale-105 hover:opacity-100',
    'cursor-pointer',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'bg-transparent',
    'border-transparent',
  ),
  {
    variants: {
      size: {
        sm: 'min-w-[76px] h-9 px-3 py-1', 
        md: 'min-w-[102px] h-12 px-4 py-2',
      },
    },
    defaultVariants: {
      size: 'md', // 디폴트 값 
    },
  },
);

// 기본 button 속성들 확장
export interface RoundedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children?: ReactNode;
}

function RoundedButton({ size, className, children, ...props }: RoundedButtonProps) {
  return (
    <button className={cn(buttonVariants({ size, className }))} {...props}>
      {children}
    </button>
  );
}

export default RoundedButton;

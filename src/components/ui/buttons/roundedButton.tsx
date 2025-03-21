import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  cn(
    'flex items-center justify-center rounded-full whitespace-nowrap transition hover:scale-105 hover:opacity-100',
    'cursor-pointer',
    'disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:scale-100',
    'text-md lg:text-xl',
  ),
  {
    variants: {
      size: {
        sm: 'px-4 py-2',
        md: 'px-6 py-2',
        lg: 'px-8 py-4',
        xl: 'px-10 py-5',
      },
      variant: {
        default: 'bg-line-100 text-gray-300',
        secondary: 'bg-black-600 text-blue-100',
        tertiary: 'bg-blue-900 text-blue-100',
        outline: 'border border-line-200 bg-transparent text-blue-500 font-medium',
      },
    },
    defaultVariants: {
      size: 'md', // 디폴트 값
      variant: 'default',
    },
  },
);

// 기본 button 속성들 확장
export interface RoundedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children?: ReactNode;
}

function RoundedButton({ size, variant, className, children, ...props }: RoundedButtonProps) {
  return (
    <button className={cn(buttonVariants({ size, variant, className }))} {...props}>
      {children}
    </button>
  );
}

export default RoundedButton;

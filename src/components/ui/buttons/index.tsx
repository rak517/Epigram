import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

const buttonVariants = cva('flex items-center justify-center font-semibold disabled:cursor-not-allowed text-blue-100', {
  variants: {
    variant: {
      default: 'bg-black-500 hover:bg-black-600 active:bg-black-700 disabled:bg-blue-400',
      outline: 'border border-black-500 hover:border-black-600 active:border-black-700 disabled:border-blue-400 disabled:bg-blue-300',
    },
    size: {
      xs: 'rounded-lg py-2 px-4 text-xs',
      sm: 'rounded-lg py-2.5 px-4 text-lg ',
      md: 'rounded-xl py-3 px-8 text-lg',
      lg: 'rounded-xl py-4 px-10 text-xl',
      xl: 'rounded-xl py-5 px-24 text-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children?: ReactNode;
}

export default function Button({ variant, size, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {children}
    </button>
  );
}

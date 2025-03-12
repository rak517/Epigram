'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import UpperArrow from '@/assets/icons/Upper_Arrow.svg';

const floatingButtonVariants = cva(
  cn([
    'fixed bottom-12 right-12', //
    'flex items-center justify-center rounded-full bg-blue-900 cursor-pointer', //
    'hover:bg-black-400',
  ]),
  {
    variants: {
      size: {
        md: 'size-8 shadow-[0px_4px_4px_0px_#55555540]',
        lg: 'size-12 shadow-[0px_4px_4px_0px_#ACACAC33]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

interface FloatingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof floatingButtonVariants> {
  children?: ReactNode;
}

export default function FloatingButton({ size, className, children, ...props }: FloatingButtonProps) {
  return (
    <button
      className={cn(floatingButtonVariants({ size, className }))}
      {...props}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      {children ?? (
        <Image
          src={UpperArrow}
          alt='플로팅 액션 버튼 이미지'
          width={24}
          height={12}
          className={cn({
            'h-2 w-4': size === 'md' || size === undefined,
            'h-3 w-6': size === 'lg',
          })}
        />
      )}
    </button>
  );
}

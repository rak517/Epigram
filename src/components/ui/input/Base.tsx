import { cva } from 'class-variance-authority';
import { LabelHTMLAttributes, PropsWithChildren } from 'react';

export function BaseItem({ children }: PropsWithChildren) {
  return <div className='grid gap-1'>{children}</div>;
}

export function BaseLabel({ required, children, ...props }: PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }>) {
  return (
    <label className='text-black-600 text-md lg:gap1.5 inline-flex items-center gap-1 font-semibold md:text-lg lg:text-xl' {...props}>
      {children}
      {required && <span className='text-error flex items-center pt-1.5 text-lg font-medium lg:text-2xl'>*</span>}
    </label>
  );
}

export function BaseError({ children }: PropsWithChildren) {
  return <div className='text-error md:text-md text-xs lg:text-lg'>{children}</div>;
}

export const baseFieldClassName = cva(
  'rounded-lg w-full px-4 h-11 lg:h-[64px] md:w-[384px] lg:w-[640px] text-black-950 placeholder-blue-400 text-lg lg:text-xl focus-visible:outline-none read-only:text-blue-400',
  {
    variants: {
      variant: {
        default: 'bg-background-100',
        outlined: 'border border-blue-300 bg-transparent',
      },
    },
  },
);
export const baseErrorClassName = 'border border-error';

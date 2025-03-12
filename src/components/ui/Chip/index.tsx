import { cn } from '@/utils/cn';
import { HTMLAttributes } from 'react';

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
}

export default function Chip({ label, className, ...props }: ChipProps) {
  return (
    <span
      className={cn('bg-background-100 text-black-300 rounded-[18px] px-3 py-2 text-lg whitespace-nowrap md:rounded-[20px] md:text-xl lg:rounded-[22px] lg:px-3.5 lg:py-3 lg:text-2xl', className)}
      {...props}
    >
      {label}
    </span>
  );
}

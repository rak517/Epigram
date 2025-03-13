"use client";
import { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import dropdownIcon from '@/assets/icons/dropdown_icon.svg';

const DropdownVariants = cva('absolute overflow-hidden', {
  variants: {
    variant: {
      default: 'bg-white border border-gray-100',
      outline: 'bg-white border border-gray-100',
    },
    size: {
      sm: 'w-[100px] rounded-[10px] sm:w-[70px] md:w-[80px] lg:w-[97px] lg:rounded-[16px]',
      md: 'w-[100px] rounded-[10px] sm:w-[100px] md:w-[120px] lg:w-[134px] lg:rounded-[16px]',
      lg: 'w-[100px] rounded-[10px] sm:w-[120px] md:w-[130px] lg:w-[150px] lg:rounded-[16px]',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

interface DropdownProps extends VariantProps<typeof DropdownVariants> {
  className?: string;
  options?: string[];
  onSelect?: (option: string) => void;
}

export default function DropdownMenu({
  variant,
  size = 'md',
  options = ["수정하기", "삭제하기"],
  onSelect,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const liPaddingClasses =
    size === 'md'
      ? 'py-2 text-md lg:py-4 lg:text-xl'
      : size === 'sm'
        ? 'py-2 text-xs lg:py-2 lg:text-md'
        : size === 'lg'
          ? 'py-2 text-md lg:py-6 lg:text-2xl'
          : 'py-2 text-md lg:py-4 lg:text-xl';

  return (
    <div className="relative inline-block ">
      <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        <Image src={dropdownIcon} alt="Dropdown Icon" />
      </button>
      {isOpen && (
        <ul className={cn(DropdownVariants({ variant, size }),
          'top-[45px] right-0'
        )}>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setIsOpen(false);
                onSelect?.(option);
              }}
              className={cn(
                liPaddingClasses,
                'hover:bg-gray-100 cursor-pointer text-center',
                'text-[var(--color-black-800)]'
              )}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

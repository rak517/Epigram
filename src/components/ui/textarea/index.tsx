'use client';

import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { TextareaHTMLAttributes, useState, ChangeEvent, Ref } from 'react';

const textAreaVariants = cva('bg-white placeholder-blue-300', {
  variants: {
    variant: {
      limit100: '',
      limit500: '',
    },
    size: {
      '100sm': 'w-[248px] h-[80px] pt-[12px] pb-[42px] px-[16px]',
      '100md': 'w-[320px] h-[80px] pt-[12px] pb-[42px] px-[16px]',
      '100lg': 'w-[568px] h-[104px] pt-[12px] pb-[60px] px-[16px]',
      sm: 'w-[312px] h-[132px] pt-[10px] pb-[96px] px-[16px]',
      md: 'w-sm h-[132px] pt-[10px] pb-[96px] px-[16px]',
      lg: 'w-[640px] h-[148px] pt-[10px] pb-[106px] px-[16px]',
      text: 'w-full h-[132px] xl:h-[148px]', // 우선 사이즈 디폴트가 사라지지 않아서 반응형 작업에 문제가 생기더라구요 일단 이렇게 작업하고 추후에 수정하겠습니다<div className=""></div>
      source: 'w-full h-[44px] xl:h-[64px]',
    },
    fontSize: {
      base: 'text-base',
      xl: 'text-xl',
    },
    border: {
      'line-border': 'border border-line-200 border-solid',
      'blue-border': 'border border-blue-500 border-solid',
    },
    borderRadius: {
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
  },
  defaultVariants: {
    variant: 'limit100',
    size: 'md',
    fontSize: 'base',
    border: 'line-border',
    borderRadius: 'lg',
  },
});

const charCountContainerStyle = 'absolute -bottom-4 right-0 text-xs flex items-center';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textAreaVariants> {
  maxLength?: number;
  ref?: Ref<HTMLTextAreaElement>;
}

export default function TextArea({ variant, size, fontSize, border, borderRadius, maxLength, onChange, value, defaultValue, ref, className, placeholder, ...props }: TextAreaProps) {
  const initialValue = value?.toString() || defaultValue?.toString() || '';

  const [charCount, setCharCount] = useState(initialValue.length);

  let charLimit = 0;

  if (variant === 'limit100') {
    charLimit = 100;
  } else if (variant === 'limit500') {
    charLimit = 500;
  }

  if (isNaN(charLimit)) {
    charLimit = 0;
  }

  const effectiveMaxLength = maxLength || charLimit || undefined;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    if (effectiveMaxLength && newValue.length > effectiveMaxLength) {
      e.target.value = newValue.slice(0, effectiveMaxLength);
    }

    setCharCount(e.target.value.length);

    // 사용자가 정의한 onChange 핸들러 실행되게.
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className='relative'>
      <textarea
        className={cn(textAreaVariants({ variant, size, fontSize, border, borderRadius, className }))}
        onChange={handleChange}
        maxLength={effectiveMaxLength}
        value={value}
        defaultValue={defaultValue}
        ref={ref}
        placeholder={placeholder}
        style={{
          padding: '10px 16px', // 플레이스홀더가 들어갈 안쪽 패딩 설정
        }}
        {...props}
      />

      {charLimit > 0 && (
        <div className={charCountContainerStyle}>
          <span className={charCount >= charLimit ? 'text-red-500' : 'text-gray-500'}>{charCount}</span>
          <span className='text-gray-500'>/{charLimit}</span>
        </div>
      )}
    </div>
  );
}

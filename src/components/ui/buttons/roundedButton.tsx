import React from 'react';
import { cn } from '@/utils/cn';

export interface RoundedButtonProps {
  size?: 'small' | 'medium'; // 선택적 속성으로 변경
  backgroundColor?: string;
  borderColor?: string;
  className?: string; // 커스텀 스타일 적용
  disabled?: boolean; // 비활성화 여부
  onClick: () => void;
  children?: React.ReactNode;
}

const buttonSizes = {
  small: { minWidth: '76px', height: '36px', padding: 'px-3 py-1' },
  medium: { minWidth: '102px', height: '48px', padding: 'px-4 py-2' },
};

const RoundedButton: React.FC<RoundedButtonProps> = ({
  size, // 선택적 속성
  backgroundColor = 'transparent',
  borderColor = 'transparent',
  className,
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={cn(
        'flex items-center justify-center rounded-full border whitespace-nowrap transition hover:scale-105 hover:opacity-100',
        'cursor-pointer',
        disabled && 'cursor-not-allowed opacity-50',
        size ? buttonSizes[size].padding : '', // size 없으면 기본 padding 제거
        'gap-1', // 내부 간격 4px 유지
        className, // 사용자 지정 스타일 적용
      )}
      style={{
        borderColor,
        backgroundColor,
        ...(size ? buttonSizes[size] : {}), // size가 없으면 width, height 강제 적용 X
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default RoundedButton;

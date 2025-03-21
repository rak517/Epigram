'use client';

import Emotion, { EmotionProps } from '@/components/ui/emotion';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { useState } from 'react';
import { Emotion as EmotionType } from '@/apis/emotion-log/types';

const buttonStyles = cva('flex justify-center items-center rounded-2xl cursor-pointer', {
  variants: {
    isActive: {
      false: 'bg-blue-gray-100',
      true: 'border-3',
    },
    size: {
      sm: 'w-14 h-14',
      md: 'w-16 h-16',
      lg: 'w-18 h-18',
      xl: 'w-24 h-24',
    },
  },
  defaultVariants: {
    isActive: false,
    size: 'sm',
  },
});

const buttonBorderMap = {
  MOVED: 'border-illust-yellow',
  HAPPY: 'border-illust-green',
  SAD: 'border-illust-blue',
  WORRIED: 'border-illust-purple',
  ANGRY: 'border-illust-red',
} as const;

interface EmotionButtonProps {
  buttonVariant?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isInteractive?: boolean;
  emotion: EmotionType;
  emotionVariant?: EmotionProps['variant'];
  onClick?: () => void;
  disabled?: boolean;
}

export default function EmotionButton({ buttonVariant, emotion, emotionVariant, size, onClick, isInteractive, disabled = false }: EmotionButtonProps) {
  const [currentButtonVariant, setCurrentButtonVariant] = useState(buttonVariant);

  const buttonBorderColor = buttonBorderMap[emotion];

  const handleClick = () => {
    setCurrentButtonVariant(!currentButtonVariant);
    onClick?.();
  };
  return (
    <button
      className={cn(buttonStyles({ isActive: currentButtonVariant, size }), buttonBorderColor, isInteractive && 'size-12 md:size-16 lg:size-20 xl:size-24')}
      onClick={handleClick}
      disabled={disabled}
    >
      <Emotion variant={emotionVariant} emotion={emotion} size={size} className={cn(isInteractive && 'size-8 sm:size-9 md:size-10 lg:size-11 xl:size-12')} />
    </button>
  );
}

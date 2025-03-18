'use client';

import Emotion, { EmotionProps } from '@/components/ui/emotion';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { useState } from 'react';
import { EmotionType } from '@/types';

const buttonStyles = cva('flex justify-center items-center rounded-2xl cursor-pointer', {
  variants: {
    buttonVariant: {
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
    buttonVariant: false,
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
  emotion: EmotionType;
  emotionVariant?: EmotionProps['variant'];
  onClick?: () => void;
}

export default function EmotionButton({ buttonVariant, emotion, emotionVariant, size, onClick }: EmotionButtonProps) {
  const [currentButtonVariant, setCurrentButtonVariant] = useState(buttonVariant);

  const buttonBorderColor = buttonBorderMap[emotion];

  const handleClick = () => {
    setCurrentButtonVariant(!currentButtonVariant);
    onClick?.();
  };
  return (
    <button className={cn(buttonStyles({ buttonVariant: currentButtonVariant, size }), buttonBorderColor)} onClick={handleClick}>
      <Emotion variant={emotionVariant} emotion={emotion} size={size} />
    </button>
  );
}

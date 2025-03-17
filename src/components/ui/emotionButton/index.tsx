'use client';

import Emotion, { EmotionProps } from '@/components/ui/emotion';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { useState } from 'react';

interface EmotionButtonProps {
  buttonVariant?: 'default' | 'onSelect';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  emotion: EmotionProps['emotion'];
  emotionVariant?: EmotionProps['variant'];

  onClick?: () => void;
}

const buttonStyles = cva('flex justify-center items-center rounded-2xl cursor-pointer', {
  variants: {
    buttonVariant: {
      default: 'bg-blue-gray-100',
      onSelect: 'border-3',
    },
    size: {
      sm: 'w-14 h-14',
      md: 'w-16 h-16',
      lg: 'w-18 h-18',
      xl: 'w-24 h-24',
    },
  },
  defaultVariants: {
    buttonVariant: 'default',
    size: 'sm',
  },
});

const buttonBorderMap: Record<string, string> = {
  감동: 'border-illust-yellow',
  기쁨: 'border-illust-green',
  슬픔: 'border-illust-purple',
  고민: 'border-illust-blue',
  분노: 'border-illust-red',
};

export default function EmotionButton({ buttonVariant, emotion, emotionVariant, size, onClick }: EmotionButtonProps) {
  const [currentButtonVariant, setCurrentButtonVariant] = useState(buttonVariant || 'default');

  const buttonBorderColor = buttonBorderMap[emotion];

  const handleClick = () => {
    setCurrentButtonVariant(currentButtonVariant === 'default' ? 'onSelect' : 'default');
    onClick?.();
  };
  return (
    <button className={cn(buttonStyles({ buttonVariant: currentButtonVariant, size }), buttonBorderColor)} onClick={handleClick}>
      <Emotion variant={emotionVariant} emotion={emotion} size={size} />
    </button>
  );
}

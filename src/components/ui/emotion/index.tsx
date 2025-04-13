import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { emotionPaths } from './EmotionPath';

const emotionVariants = cva('flex items-center justify-center', {
  variants: {
    variant: {
      default: '',
      grayScales: 'grayscale-100',
    },
    size: {
      '2xs': 'size-4',
      xs: 'size-6',
      sm: 'size-8',
      md: 'size-8',
      lg: 'size-9',
      '2lg': 'size-10',
      xl: 'size-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

type EmotionVariants = typeof emotionPaths;

export interface EmotionProps extends VariantProps<typeof emotionVariants> {
  emotion: keyof EmotionVariants;
  className?: string;
}

export default function Emotion({ variant, emotion, size, className }: EmotionProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none' aria-label={emotion} className={cn(emotionVariants({ variant, size, className }))}>
      {emotionPaths[emotion]}
    </svg>
  );
}

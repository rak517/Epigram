import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import Image, { ImageProps } from 'next/image';

const avatarVariants = cva('rounded-full flex items-center justify-center', {
  variants: {
    size: {
      default: 'size-12',
      md: 'size-20 border-2 border-blue-300',
      lg: 'size-[120px] border-2 border-blue-300',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface AvatarProps extends Omit<ImageProps, 'src'>, VariantProps<typeof avatarVariants> {
  src?: string | null;
}

export default function Avatar({ src = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL!, alt, size, className, ...props }: AvatarProps) {
  const encodedUri = encodeURI(src ?? process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL!);
  return <Image src={encodedUri} alt={alt} width={120} height={120} className={cn(avatarVariants({ size, className }))} {...props} />;
}

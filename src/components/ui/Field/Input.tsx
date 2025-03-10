import { cn } from '@/utils/cn';
import { InputHTMLAttributes, Ref, useId } from 'react';
import { BaseError, BaseItem, BaseLabel, baseErrorClassName, baseFieldClassName } from './Base';
import { BaseField } from './types';
import { VariantProps } from 'class-variance-authority';

export type InputProps = BaseField &
  InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof baseFieldClassName> & {
    ref?: Ref<HTMLInputElement>;
    variant?: 'default' | 'outlined';
  };

export default function Input({ label, error, variant = 'default', className, ref, ...props }: InputProps) {
  const id = useId();

  return (
    <BaseItem>
      {label && (
        <BaseLabel required={props.required} htmlFor={id}>
          {label}
        </BaseLabel>
      )}
      <input id={id} className={cn(baseFieldClassName({ variant, className }), error && baseErrorClassName)} ref={ref} {...props} />
      {error && <BaseError>{error}</BaseError>}
    </BaseItem>
  );
}

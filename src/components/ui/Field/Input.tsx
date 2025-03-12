import { cn } from '@/utils/cn';
import { InputHTMLAttributes, Ref, useId } from 'react';
import { BaseError, BaseItem, BaseLabel, BASE_ERROR_CLASSNAME, baseFieldClassName } from './Base';
import { BaseField } from './types';
import { VariantProps } from 'class-variance-authority';

export type InputProps = BaseField &
  InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof baseFieldClassName> & {
    ref?: Ref<HTMLInputElement>;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; //Todo onChange 추가했습니다. 11번, 14번, 24번 줄 / 이유: kewordCard 사용시 글자 하이라이트 주기 위해서
  };

export default function Input({ label, error, variant = 'default', className, ref, onChange, ...props }: InputProps) {
  const id = useId();

  return (
    <BaseItem>
      {label && (
        <BaseLabel required={props.required} htmlFor={id}>
          {label}
        </BaseLabel>
      )}{' '}
      <input id={id} className={cn(baseFieldClassName({ variant, className }), error && BASE_ERROR_CLASSNAME)} ref={ref} onChange={onChange} {...props} />
      {error && <BaseError>{error}</BaseError>}
    </BaseItem>
  );
}

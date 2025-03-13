'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/schemas';
import { SignupForm as SignupFormType } from '@/types';
import Input from '@/components/ui/Field/Input';

export default function SignupForm() {
  const {
    register,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });
  return (
    <form>
      <Input label='이메일' error={errors.email?.message} type='email' placeholder='이메일' required {...register('email')} data-testid='email-input' />
    </form>
  );
}

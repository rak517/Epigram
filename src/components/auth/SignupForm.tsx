'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { signupSchema } from '@/schemas';
import { SignupForm as SignupFormType } from '@/types';
import Input from '@/components/ui/Field/Input';
import Button from '@/components/ui/buttons';
import OpendEye from '@/assets/icons/opend_eye.svg';
import ClosedEye from '@/assets/icons/closed_eye.svg';

export default function SignupForm() {
  const {
    register,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(true);

  const isDisabled = !isDirty || !isValid || isSubmitting;

  return (
    <form>
      <Input label='이메일' error={errors.email?.message} type='email' placeholder='이메일' required {...register('email')} data-testid='email-input' disabled={isSubmitting} />
      <div className='relative'>
        <Input
          label='비멀번호'
          error={errors.password?.message}
          type={isShowPassword ? 'password' : 'text'}
          placeholder='비밀번호'
          required
          {...register('password')}
          data-testid='password-input'
          disabled={isSubmitting}
        />
        <Image
          src={isShowPassword ? ClosedEye : OpendEye}
          alt='비밀번호 토글 이미지'
          width={24}
          height={24}
          className='absolute top-5 right-3'
          onClick={() => setIsShowPassword((prev) => !prev)}
          data-testid='password-toggle'
        />
      </div>
      <div className='relative'>
        <Input
          label='비멀번호 확인'
          error={errors.passwordConfirm?.message}
          type={isShowPasswordConfirm ? 'password' : 'text'}
          placeholder='비밀번호 확인'
          required
          {...register('passwordConfirm')}
          data-testid='password-confirm-input'
          disabled={isSubmitting}
        />
        <Image
          src={isShowPasswordConfirm ? ClosedEye : OpendEye}
          alt='비밀번호 토글 이미지'
          width={24}
          height={24}
          className='absolute top-5 right-3'
          onClick={() => setIsShowPasswordConfirm((prev) => !prev)}
          data-testid='password-confirm-toggle'
        />
      </div>
      <Input label='닉네임' error={errors.nickname?.message} type='text' placeholder='닉네임' required {...register('nickname')} data-testid='nickname-input' disabled={isSubmitting} />
      <Button disabled={isDisabled} className='w-full' data-testid='signup-button'>
        가입하기
      </Button>
    </form>
  );
}

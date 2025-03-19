'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/apis/auth/schemas';
import { LoginForm as LoginFormType } from '@/apis/auth/types';
import Input from '@/components/ui/Field/Input';
import Button from '@/components/ui/buttons';
import { useModalStore } from '@/stores/ModalStore';
import { getErrorMessage } from '@/utils/network/getErrorMessage';
import { useLogin } from '@/apis/auth/queries';
import OpendEye from '@/assets/icons/opend_eye.svg';
import ClosedEye from '@/assets/icons/closed_eye.svg';
import Logo from '@/assets/images/logo.png';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync: login } = useLogin();
  const { openModal } = useModalStore();

  const [isShowPassword, setIsShowPassword] = useState(true);
  const isDisabled = !isDirty || !isValid || isSubmitting;

  const onSubmit = async (loginForm: LoginFormType) => {
    try {
      await login(loginForm);
      reset();
      openModal({
        type: 'alert',
        title: '로그인에 성공했습니다!',
        description: '확인 버튼을 누르시면 홈페이지로 이동합니다.',
        callback: () => {
          window.location.href = '/';
        },
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      openModal({
        type: 'alert',
        title: '회원가입에 실패했습니다.',
        description: errorMessage,
      });
    }
  };

  return (
    <form className='flex w-full max-w-96 flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
      <Link className='flex w-full items-center justify-center' href='/'>
        <Image src={Logo} alt='로고' width={172} height={48} className='cursor-pointer' />
      </Link>
      <Input
        label='이메일'
        error={errors.email?.message}
        type='email'
        placeholder='이메일'
        required
        {...register('email')}
        data-testid='email-input-login'
        disabled={isSubmitting}
        className='text-md md:text-lg lg:text-xl'
      />
      <div className='relative'>
        <Input
          label='비밀번호'
          type={isShowPassword ? 'password' : 'text'}
          error={errors.password?.message}
          placeholder='비밀번호'
          required
          {...register('password')}
          data-testid='password-input-login'
          disabled={isSubmitting}
          className='text-md md:text-lg lg:text-xl'
        />
        <Image
          src={isShowPassword ? ClosedEye : OpendEye}
          alt='비밀번호 토글 이미지'
          width={24}
          height={24}
          className='absolute top-[46px] right-3 cursor-pointer lg:top-[60px]'
          onClick={() => setIsShowPassword((prev) => !prev)}
          data-testid='password-toggle-login'
        />
      </div>
      <Button disabled={isDisabled} className='text-md w-full' data-testid='login-button' size='xs'>
        로그인
      </Button>
    </form>
  );
}

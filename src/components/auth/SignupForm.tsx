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
import Logo from '@/assets/images/logo.png';
import Link from 'next/link';
import { useSignup } from '@/apis/auth/queries';
import { useModalStore } from '@/stores/ModalStore';
import { useRouter } from 'next/navigation';
import { getErrorMessage } from '@/utils/network/getErrorMessage';
import { isAxiosError } from 'axios';

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirmation: '',
    },
  });
  const { mutateAsync: signup } = useSignup();
  const { openModal } = useModalStore();
  const router = useRouter();

  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(true);

  const isDisabled = !isDirty || !isValid || isSubmitting;

  const onSubmit = async (signupForm: SignupFormType) => {
    try {
      await signup(signupForm);
      reset();
      openModal({
        type: 'alert',
        title: '회원가입이 완료되었습니다!',
        description: '확인 버튼을 누르시면 홈페이지로 이동합니다.',
        callback: () => {
          router.push('/');
        },
      });
    } catch (error) {
      let errorMessage = '';
      if (isAxiosError(error) && error.status === 500) errorMessage = '중복된 닉네임입니다.';
      else errorMessage = getErrorMessage(error);
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
        data-testid='email-input'
        disabled={isSubmitting}
        className='text-md md:text-lg lg:text-xl'
      />
      <div className='relative'>
        <Input
          label='비밀번호'
          error={errors.password?.message}
          type={isShowPassword ? 'password' : 'text'}
          placeholder='비밀번호'
          required
          {...register('password')}
          data-testid='password-input'
          disabled={isSubmitting}
          className='text-md md:text-lg lg:text-xl'
        />
        <Image
          src={isShowPassword ? ClosedEye : OpendEye}
          alt='비밀번호 토글 이미지'
          width={24}
          height={24}
          className='absolute top-11 right-3 lg:top-15'
          onClick={() => setIsShowPassword((prev) => !prev)}
          data-testid='password-toggle'
        />
      </div>
      <div className='relative'>
        <Input
          label='비밀번호 확인'
          error={errors.passwordConfirmation?.message}
          type={isShowPasswordConfirm ? 'password' : 'text'}
          placeholder='비밀번호 확인'
          required
          {...register('passwordConfirmation')}
          data-testid='password-confirm-input'
          disabled={isSubmitting}
          className='text-md md:text-lg lg:text-xl'
        />
        <Image
          src={isShowPasswordConfirm ? ClosedEye : OpendEye}
          alt='비밀번호 토글 이미지'
          width={24}
          height={24}
          className='absolute top-11 right-3 lg:top-15'
          onClick={() => setIsShowPasswordConfirm((prev) => !prev)}
          data-testid='password-confirm-toggle'
        />
      </div>
      <Input
        label='닉네임'
        error={errors.nickname?.message}
        type='text'
        placeholder='닉네임'
        required
        {...register('nickname')}
        data-testid='nickname-input'
        disabled={isSubmitting}
        className='text-md md:text-lg lg:text-xl'
      />
      <Button disabled={isDisabled} className='w-full' data-testid='signup-button'>
        가입하기
      </Button>
    </form>
  );
}

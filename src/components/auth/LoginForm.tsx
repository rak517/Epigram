import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas';
import { LoginForm as LoginFormType } from '@/types';
import Input from '@/components/ui/Field/Input';
import OpendEye from '@/assets/icons/opend_eye.svg';
import ClosedEye from '@/assets/icons/closed_eye.svg';

export default function LoginForm() {
  const {
    register,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [isShowPassword, setIsShowPassword] = useState(true);
  return (
    <form>
      <Input label='이메일' error={errors.email?.message} type='email' placeholder='이메일' required {...register('email')} data-testid='email-input-login' />
      <div className='relative'>
        <Input
          label='비밀번호'
          type={isShowPassword ? 'password' : 'text'}
          error={errors.password?.message}
          placeholder='비밀번호'
          required
          {...register('password')}
          data-testid='password-input-login'
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
    </form>
  );
}

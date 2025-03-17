import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas';
import { LoginForm as LoginFormType } from '@/types';
import Input from '@/components/ui/Field/Input';

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
  return (
    <form>
      <Input label='이메일' error={errors.email?.message} type='email' placeholder='이메일' required {...register('email')} data-testid='email-input-login' />
      <Input label='비밀번호' error={errors.password?.message} type='password' placeholder='비밀번호' required {...register('password')} data-testid='password-input-login' />
    </form>
  );
}

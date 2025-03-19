import { useMutation } from '@tanstack/react-query';
import { LoginForm, SignupForm } from '@/types';
import { login, signup } from '.';

export const useSignup = () => {
  return useMutation({
    mutationFn: (signupForm: SignupForm) => {
      return signup(signupForm);
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (loginForm: LoginForm) => {
      return login(loginForm);
    },
  });
};

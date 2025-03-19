import { useMutation } from '@tanstack/react-query';
import { login, signup } from '.';
import { LoginForm, SignupForm } from './types';

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

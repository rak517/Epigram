import { useMutation } from '@tanstack/react-query';
import { SignupForm } from '@/types';
import { signup } from '.';

export const useSignup = () => {
  return useMutation({
    mutationFn: (signupForm: SignupForm) => {
      return signup(signupForm);
    },
  });
};

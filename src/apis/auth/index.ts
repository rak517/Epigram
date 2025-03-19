import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { safeResponse } from '@/utils/network/safeResponse';
import { userResponseSchema } from '@/schemas';
import { LoginForm, SignupForm, User } from '@/types';

/**
 * 회원가입
 * https://fe-project-epigram-api.vercel.app/docs/#/Auth/SignUp
 */
export const signup = async (signupForm: SignupForm) => {
  const response = await axiosClientHelper.post<{ user: User }>('/auth/signUp', signupForm);
  return safeResponse(response.data, userResponseSchema);
};

/**
 * 로그인
 * https://fe-project-epigram-api.vercel.app/docs/#/Auth/SignIn
 */
export const login = async (loginForm: LoginForm) => {
  const response = await axiosClientHelper.post<{ user: User }>('/auth/signIn', loginForm);
  return safeResponse(response.data, userResponseSchema);
};

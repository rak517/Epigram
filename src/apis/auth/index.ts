import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { safeResponse } from '@/utils/network/safeResponse';
import { userResponseSchema } from '@/schemas';
import { SignupForm, User } from '@/types';

export const signup = async (signupForm: SignupForm) => {
  const response = await axiosClientHelper.post<{ user: User }>('/auth/signUp', signupForm);
  return safeResponse(response.data, userResponseSchema);
};

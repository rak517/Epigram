import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { safeResponse } from '@/utils/network/safeResponse';
import { userSchema } from '@/schemas';
import { User } from '@/types';

/**
 * 사용자 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/Auth/SignUp
 */
export const getUser = async () => {
  const response = await axiosClientHelper.get<User>('/users/me');
  return safeResponse(response.data, userSchema);
};

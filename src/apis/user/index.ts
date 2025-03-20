import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { safeResponse } from '@/utils/network/safeResponse';
import { userSchema } from './schemas';
import { PatchUser, User } from './types';
import { GetCommentsParams } from '@/apis/epigram/types';
import { CommentsResponse } from '@/apis/comment/types';
import { commentsResponseSchema } from '@/apis/comment/schemas';

/**
 * 내 정보 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/Auth/SignUp
 */
export const getUser = async () => {
  const response = await axiosClientHelper.get<User>('/users/me');
  return safeResponse(response.data, userSchema);
};

/**
 * 내 정보 수정
 * https://fe-project-epigram-api.vercel.app/docs/#/User/UpdatePassword
 */
export const patchUser = async (user: PatchUser) => {
  const response = await axiosClientHelper.patch<User>('/users/me', user);
  return safeResponse(response.data, userSchema);
};

/**
 * 사용자 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/User/RetrieveUser
 */
export const getDetailUser = async (userId: User['id']) => {
  const response = await axiosClientHelper.get<User>(`/users/${userId}`);
  return safeResponse(response.data, userSchema);
};

/**
 * 사용자 댓글 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/User/ListComments
 */
export const getComments = async (userId: User['id'], commentsParams: GetCommentsParams) => {
  const response = await axiosClientHelper.get<CommentsResponse>(`/users/${userId}/comments`, {
    params: {
      ...commentsParams,
    },
  });
  return safeResponse(response.data, commentsResponseSchema);
};

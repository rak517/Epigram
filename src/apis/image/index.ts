import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { safeResponse } from '@/utils/network/safeResponse';
import { ImageUploadResponse } from './types';
import { imageUploadResponseSchema } from './schemas';

/**
 * 이미지 업로드
 * https://fe-project-epigram-api.vercel.app/docs/#/Image/ImageUpload
 */
export const postImage = async (form: FormData) => {
  const response = await axiosClientHelper.post<ImageUploadResponse>('/images/upload', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return safeResponse(response.data, imageUploadResponseSchema);
};

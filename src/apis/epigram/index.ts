import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { safeResponse } from '@/utils/network/safeResponse';
import { epigramSchema, epigramsResponseSchema } from './schemas';
import { Epigram, EpigramForm, EpigramsResponse, GetCommentsParams, GetEpigramsParams, PatchEpigram } from './types';
import { z } from 'zod';
import { CommentsResponse } from '@/apis/comment/types';
import { commentsResponseSchema } from '@/apis/comment/schemas';

/**
 * 에피그램 생성
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/CreateEpigram
 */
export const postEpigram = async (epigramForm: EpigramForm) => {
  const response = await axiosClientHelper.post<Epigram>('/epigrams', epigramForm);
  return safeResponse(response.data, epigramSchema);
};

/**
 * 에피그램 목록 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/ListEpigrams
 */
export const getEpigrams = async (epigramsParams: GetEpigramsParams) => {
  const response = await axiosClientHelper.get<EpigramsResponse>('/epigrams', {
    params: {
      ...epigramsParams,
    },
  });
  return safeResponse(response.data, epigramsResponseSchema);
};

/**
 * 오늘의 에피그램 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/RetrieveTodayEpigram
 */
export const getTodayEpigram = async () => {
  const response = await axiosClientHelper.get<Epigram>('/epigrams/today');
  return safeResponse(response.data, epigramSchema);
};

/**
 * 에피그램 상세 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/RetrieveEpigram
 */
export const getEpigram = async (epigramId: number) => {
  const response = await axiosClientHelper.get<Epigram>(`/epigrams/${epigramId}`);
  return safeResponse(response.data, epigramSchema);
};

/**
 * 에피그램 수정
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/UpdateEpigram
 */
export const patchEpigram = async (epigramId: number, epigram: PatchEpigram) => {
  const response = await axiosClientHelper.patch<Epigram>(`/epigrams/${epigramId}`, { ...epigram });
  return safeResponse(response.data, epigramSchema);
};

/**
 * 에피그램 삭제
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/DeleteEpigram
 */
export const deleteEpigram = async (epigramId: number) => {
  const response = await axiosClientHelper.delete<{ id: number }>(`/epigrams/${epigramId}`);
  return safeResponse(response.data, z.object({ id: z.number() }));
};

/**
 * 에피그램 좋아요
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/LikeEpigram
 */
export const postEpigramFavorite = async (epigramId: number) => {
  const response = await axiosClientHelper.post<Epigram>(`/epigrams/${epigramId}/like`);
  return safeResponse(response.data, epigramSchema);
};

/**
 * 에피그램 좋아요 삭제
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/UnlikeEpigram
 */
export const deleteEpigramFavorite = async (epigramId: number) => {
  const response = await axiosClientHelper.delete<Epigram>(`/epigrams/${epigramId}/like`);
  return safeResponse(response.data, epigramSchema);
};

/**
 * 에피그램 댓글 목록 조회
 * https://fe-project-epigram-api.vercel.app/docs/#/Epigram/ListEpigramComments
 */
export const getComments = async (epigramId: number, commentsParams: GetCommentsParams) => {
  const response = await axiosClientHelper.get<CommentsResponse>(`/epigrams/${epigramId}/comments`, {
    params: {
      ...commentsParams,
    },
  });
  return safeResponse(response.data, commentsResponseSchema);
};

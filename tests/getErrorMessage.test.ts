import { getErrorMessage } from '@/utils/network/getErrorMessage';
import { AxiosError } from 'axios';

describe('getErrorMessage 단위 테스트', () => {
  test('알 수 없는 값이 들어오면 기본 메시지를 반환한다', () => {
    expect(getErrorMessage(null)).toBe('알 수 없는 에러가 발생했어요.');
    expect(getErrorMessage(undefined)).toBe('알 수 없는 에러가 발생했어요.');
    expect(getErrorMessage('오류 발생')).toBe('알 수 없는 에러가 발생했어요.');
    expect(getErrorMessage({})).toBe('알 수 없는 에러가 발생했어요.');
  });

  test('일반 Error 객체가 들어오면 error.message를 반환한다', () => {
    const error = new Error('일반 Error 객체');

    const result = getErrorMessage(error);
    expect(result).toBe('일반 Error 객체');
  });

  test('응답이 없는 AxiosError일 경우 기본 error.message를 반환한다', () => {
    const axiosError = new AxiosError('Network Error');

    const result = getErrorMessage(axiosError);
    expect(result).toBe('Network Error');
  });

  test('응답 데이터에 message 필드가 없으면 기본 error.message를 반환한다', () => {
    const axiosError = new AxiosError('Request failed', 'ERROR_BAD_REQUEST', undefined, undefined, {
      status: 400,
      data: {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const result = getErrorMessage(axiosError);
    expect(result).toBe('Request failed');
  });

  test('응답 데이터에 message 필드가 있으면 해당 메시지를 반환한다', () => {
    const axiosError = new AxiosError('Request failed', 'ERROR_BAD_REQUEST', undefined, undefined, {
      status: 400,
      data: { message: '잘못된 요청입니다.' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const result = getErrorMessage(axiosError);
    expect(result).toBe('잘못된 요청입니다.');
  });
});

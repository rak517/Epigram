/* eslint-disable @typescript-eslint/no-explicit-any */
import getTimeElapsed from '@/utils/getTimeElapsed';

describe('getTimeElapsed 단위 테스트', () => {
  test('잘못된 날짜 문자열을 입력하면 null을 반환한다', () => {
    expect(getTimeElapsed('')).toBeNull();
    expect(getTimeElapsed('123')).toBeNull();
    expect(getTimeElapsed('ABC')).toBeNull();
    expect(getTimeElapsed('!@#$')).toBeNull();
    expect(getTimeElapsed('123ABC')).toBeNull();
  });

  test('유효하지 않은 Date 객체를 입력하면 null을 반환한다', () => {
    expect(getTimeElapsed(new Date('Invalid Date'))).toBeNull();
  });

  test('부적절한 타입의 입력(숫자, 불리언, 객체, 배열)을 전달하면 null을 반환한다', () => {
    expect(getTimeElapsed(12345 as any)).toBeNull();
    expect(getTimeElapsed(true as any)).toBeNull();
    expect(getTimeElapsed({} as any)).toBeNull();
    expect(getTimeElapsed([] as any)).toBeNull();
  });

  test('null 또는 undefined을 입력하면 null을 반환한다.', () => {
    expect(getTimeElapsed(null as any)).toBeNull();
    expect(getTimeElapsed(undefined as any)).toBeNull();
  });

  test('올바른 날짜 문자열을 입력하면 상대 시간을 반환한다', () => {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();

    const result = getTimeElapsed(fiveMinutesAgo);
    expect(result).toContain('분 전');
  });

  test('올바른 Date 객체를 입력하면 상대 시간을 반환한다', () => {
    const now = getTimeElapsed(new Date());
    const tenMinutesAgo = getTimeElapsed(new Date(Date.now() - 10 * 60 * 1000));

    expect(now).toContain('초 전');
    expect(tenMinutesAgo).toContain('분 전');
  });

  test('1시간 전은 "시간 전"을 포함해야 한다', () => {
    const oneHourAgo = getTimeElapsed(new Date(Date.now() - 60 * 60 * 1000));
    expect(oneHourAgo).toContain('시간 전');
  });

  test('1일 전은 "하루 전"을 포함해야 한다', () => {
    const oneDayAgo = getTimeElapsed(new Date(Date.now() - 24 * 60 * 60 * 1000));
    expect(oneDayAgo).toContain('하루 전');
  });

  test('1달 전은 "달 전"을 포함해야 한다', () => {
    const oneMonthAgo = getTimeElapsed(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    expect(oneMonthAgo).toContain('달 전');
  });

  test('1년 전은 "년 전"을 포함해야 한다', () => {
    const oneYearAgo = getTimeElapsed(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000));
    expect(oneYearAgo).toContain('년 전');
  });
});

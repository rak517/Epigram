import { getExpirationDate } from '@/utils/network/getExpirationDate';

describe('getExpirationDate 단위 테스트', () => {
  test('올바르지 않은 JWT 토큰 형식이면 null을 반환한다.', () => {
    const invalidToken = 'invalid.token.format';

    const result = getExpirationDate(invalidToken);
    expect(result).toBeNull();
  });

  it('JWT 토큰의 payload에서 exp 필드가 없다면 null을 반환한다.', () => {
    const payload = {};
    const token = `header.${Buffer.from(JSON.stringify(payload)).toString('base64')}.signature`;

    const result = getExpirationDate(token);
    expect(result).toBeNull();
  });

  test('유효한 JWT 토큰이면 Date 객체를 반환하고, 해당 Date 객체의 시간과 payload의 시간이 일치한다.', () => {
    const expTime = Math.floor(Date.now() / 1000) + 3600;
    const payload = { exp: expTime };
    const token = `header.${Buffer.from(JSON.stringify(payload)).toString('base64')}.signature`;

    const result = getExpirationDate(token);
    expect(result).toBeInstanceOf(Date);
    expect(result?.getTime()).toBe(expTime * 1000);
  });
});

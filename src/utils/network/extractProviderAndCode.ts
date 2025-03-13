import { convertGoogleToken } from './convertGoogleToken';

type Provider = 'GOOGLE' | 'KAKAO';

/**
 * OAUTH 인가 서버로부터 받는 콜백 URI를 파싱하는 함수입니다.
 *
 * Provider와 code를 추출하기 위해 사용합니다.
 *
 * [example]
 * 구글의 경우 http://localhost:3000/oauth/signup/google?state=google-login-state&code=코드값&scope=스코프값&... 형태로 URL을 줘야합니다.
 *
 * 그러면 해당 함수에서 provider는 GOOGLE이 되게하고, code는 코드값이 되게합니다.
 *
 * 구글의 경우 클라이언트 ID(JWT)로 외부 백엔드에게 제공해야 해서 convert하는 함수로 변환해서 반환합니다.
 * 카카오의 경우에는 URL 파싱만 하면 되기에 파싱한 값 그대로 리턴합니다.
 */
export const extractProviderAndCode = async (requestUrl: string): Promise<{ provider: Provider; code: string }> => {
  const url = new URL(requestUrl);

  const pathParts = url.pathname.split('/');
  const provider = pathParts[pathParts.length - 1].toUpperCase() as Provider;

  const code = url.searchParams.get('code');
  return { provider, code: provider === 'GOOGLE' ? await convertGoogleToken(code ?? '') : code };
};

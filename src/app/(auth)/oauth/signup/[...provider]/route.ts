import { User } from '@/apis/user/types';
import { getErrorMessage } from '@/utils/network/getErrorMessage';
import { extractProviderAndCode } from '@/utils/network/extractProviderAndCode';
import { getExpirationDate } from '@/utils/network/getExpirationDate';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const { provider, code } = await extractProviderAndCode(req.url);

  try {
    const apiResponse = await axios.post<{ user: User; accessToken: string; refreshToken: string }>(`${process.env.NEXT_PUBLIC_API_URL}/auth/signIn/${provider}`, {
      redirectUri: provider === 'KAKAO' ? process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI : process.env.NEXT_PUBLIC_GOOGLE_RDIRECT_URI,
      token: code,
    });

    const accessTokenExp = getExpirationDate(apiResponse.data.accessToken);
    const refreshTokenExp = getExpirationDate(apiResponse.data.refreshToken);

    const response = NextResponse.redirect(new URL('/', req.url));

    response.cookies.set('accessToken', apiResponse.data.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: accessTokenExp || undefined,
    });
    response.cookies.set('refreshToken', apiResponse.data.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: refreshTokenExp || undefined,
    });

    return response;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(errorMessage)}`, req.url));
  }
};

import { getExpirationDate } from '@/utils/network/getExpirationDate';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const getAccessToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  try {
    const response = await axios.post<{ accessToken: string }>(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, { refreshToken });

    const newAccessToken = response.data.accessToken;
    if (!newAccessToken) return null;
    return newAccessToken;
  } catch {
    return null;
  }
};

export const POST = async () => {
  const response = new NextResponse(null, { status: 201 });
  const accessToken = await getAccessToken();
  if (accessToken) {
    const accessTokenExp = getExpirationDate(accessToken);
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: accessTokenExp || undefined,
    });
  } else {
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
  }
  return response;
};

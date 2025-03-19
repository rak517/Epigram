import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AFTER_LOGIN_ROUTE, BEFORE_LOGIN_ROUTE } from './constants/route';

export const middleware = async (request: NextRequest) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  const pathname = request.nextUrl.pathname;

  const isAfterLoginRoute = AFTER_LOGIN_ROUTE.some((route) => pathname.startsWith(route));
  const isBeforeLoginRoute = BEFORE_LOGIN_ROUTE.includes(pathname);
  const isLoggedIn = accessToken?.value || refreshToken?.value;

  if (isBeforeLoginRoute) {
    return isLoggedIn ? NextResponse.redirect(new URL('/', request.nextUrl)) : NextResponse.next();
  }

  if (isAfterLoginRoute) {
    return isLoggedIn ? NextResponse.next() : NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/:path*'],
};

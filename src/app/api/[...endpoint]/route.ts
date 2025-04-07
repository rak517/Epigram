import { NextRequest, NextResponse } from 'next/server';
import { isEmpty, omit } from 'es-toolkit/compat';
import axiosServerHelper from '@/utils/network/axiosServerHelper';
import errorResponse from '@/utils/network/errorResponse';
import { getExpirationDate } from '@/utils/network/getExpirationDate';
import { AxiosResponse } from 'axios';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const getParseBody = async (req: NextRequest) => {
  const contentType = req.headers.get('Content-Type')?.split(';')[0];
  try {
    return contentType === 'application/json' ? await req.json() : await req.formData();
  } catch {
    return null;
  }
};

const routeHandler = async (req: NextRequest, method: Method) => {
  const url = new URL(req.url);
  const endPoint = url.pathname.replace(/^\/api/, '');
  const searchParams = Object.fromEntries(url.searchParams.entries());
  const reqData = method === 'GET' || method === 'DELETE' ? undefined : await getParseBody(req);

  try {
    const apiResponse = await axiosServerHelper({
      method,
      url: endPoint,
      ...(method === 'GET' && !isEmpty(searchParams) ? { params: searchParams } : {}),
      ...(reqData ? { data: reqData } : {}),
      headers: {
        'Content-Type': req.headers.get('Content-Type'),
      },
    });

    if (method === 'POST' && endPoint.includes('/auth')) {
      return handleAuthTokens(apiResponse);
    }

    const responseData = apiResponse.data;

    return responseData ? NextResponse.json(responseData, { status: apiResponse.status }) : new NextResponse(null, { status: apiResponse.status });
  } catch (error) {
    return errorResponse(error);
  }
};

const handleAuthTokens = (apiResponse: AxiosResponse) => {
  const response = NextResponse.json(omit(apiResponse.data, ['accessToken', 'refreshToken']), {
    status: apiResponse.status,
  });

  const accessTokenExp = getExpirationDate(apiResponse.data.accessToken);
  const refreshTokenExp = getExpirationDate(apiResponse.data.refreshToken);

  response.cookies.set('accessToken', apiResponse.data.accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.DOMAIN === process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN,
    path: '/',
    expires: accessTokenExp || undefined,
  });

  response.cookies.set('refreshToken', apiResponse.data.refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.DOMAIN === process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN,
    path: '/',
    expires: refreshTokenExp || undefined,
  });

  return response;
};

export const GET = async (req: NextRequest) => routeHandler(req, 'GET');
export const POST = async (req: NextRequest) => routeHandler(req, 'POST');
export const PUT = async (req: NextRequest) => routeHandler(req, 'PUT');
export const PATCH = async (req: NextRequest) => routeHandler(req, 'PATCH');
export const DELETE = async (req: NextRequest) => routeHandler(req, 'DELETE');

import { NextRequest, NextResponse } from 'next/server';
import { isEmpty, omit } from 'es-toolkit/compat';
import axiosServerHelper from '@/utils/network/axiosServerHelper';
import errorResponse from '@/utils/network/errorResponse';

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const endPoint = url.pathname.replace(/^\/api/, '');
  const searchParams = Object.fromEntries(url.searchParams.entries());
  try {
    const apiResponse = await axiosServerHelper.get(
      endPoint,
      !isEmpty(searchParams)
        ? {
            params: searchParams,
          }
        : {},
    );
    return NextResponse.json(apiResponse.data, { status: apiResponse.status });
  } catch (error) {
    return errorResponse(error);
  }
};

export const POST = async (request: NextRequest) => {
  const url = new URL(request.url);
  const endPoint = url.pathname.replace(/^\/api/, '');
  const contentType = request.headers.get('Content-Type')?.split(';')[0];

  try {
    const apiResponse = await axiosServerHelper.post(endPoint, contentType === 'application/json' ? await request.json() : await request.formData(), {
      headers: {
        'Content-Type': request.headers.get('Content-Type'),
      },
    });
    const response = NextResponse.json(omit(apiResponse.data, ['accessToken']), { status: apiResponse.status });
    if (endPoint === '/auth/login')
      response.cookies.set('accessToken', apiResponse.data.accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
    return response;
  } catch (error) {
    return errorResponse(error);
  }
};

export const PUT = async (request: NextRequest) => {
  const url = new URL(request.url);
  const endPoint = url.pathname.replace(/^\/api/, '');
  try {
    const apiResponse = await axiosServerHelper.put(endPoint, await request.json());
    if (isEmpty(apiResponse.data))
      return new NextResponse(null, {
        status: apiResponse.status,
      });
    return NextResponse.json(apiResponse.data, { status: apiResponse.status });
  } catch (error) {
    return errorResponse(error);
  }
};

export const DELETE = async (request: NextRequest) => {
  const url = new URL(request.url);
  const endPoint = url.pathname.replace(/^\/api/, '');
  try {
    const apiResponse = await axiosServerHelper.delete(endPoint);
    if (isEmpty(apiResponse.data))
      return new NextResponse(null, {
        status: apiResponse.status,
      });
    return NextResponse.json(apiResponse.data, { status: apiResponse.status });
  } catch (error) {
    return errorResponse(error);
  }
};

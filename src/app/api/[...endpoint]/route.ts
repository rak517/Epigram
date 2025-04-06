// import { NextRequest, NextResponse } from 'next/server';
// import { isEmpty, omit } from 'es-toolkit/compat';
// import axiosServerHelper from '@/utils/network/axiosServerHelper';
// import errorResponse from '@/utils/network/errorResponse';
// import { getExpirationDate } from '@/utils/network/getExpirationDate';

// export const GET = async (request: NextRequest) => {
//   const url = new URL(request.url);
//   const endPoint = url.pathname.replace(/^\/api/, '');
//   const searchParams = Object.fromEntries(url.searchParams.entries());
//   try {
//     const apiResponse = await axiosServerHelper.get(
//       endPoint,
//       !isEmpty(searchParams)
//         ? {
//             params: searchParams,
//           }
//         : {},
//     );
//     return apiResponse.data ? NextResponse.json(apiResponse.data, { status: apiResponse.status }) : new NextResponse(null, { status: apiResponse.status });
//   } catch (error) {
//     return errorResponse(error);
//   }
// };

// export const POST = async (request: NextRequest) => {
//   const url = new URL(request.url);
//   const endPoint = url.pathname.replace(/^\/api/, '');
//   const contentType = request.headers.get('Content-Type')?.split(';')[0];

//   let data;
//   try {
//     data = contentType === 'application/json' ? await request.json() : await request.formData();
//   } catch {
//     data = null;
//   }

//   try {
//     const apiResponse = await axiosServerHelper.post(endPoint, data, {
//       headers: {
//         'Content-Type': request.headers.get('Content-Type'),
//       },
//     });
//     const response = NextResponse.json(omit(apiResponse.data, ['accessToken', 'refreshToken']), { status: apiResponse.status });
//     if (endPoint === '/auth/signIn') {
//       const accessTokenExp = getExpirationDate(apiResponse.data.accessToken);
//       const refreshTokenExp = getExpirationDate(apiResponse.data.refreshToken);

//       response.cookies.set('accessToken', apiResponse.data.accessToken, {
//         httpOnly: true,
//         sameSite: 'lax',
//         secure: process.env.DOMAIN === process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN,
//         path: '/',
//         expires: accessTokenExp || undefined,
//       });
//       response.cookies.set('refreshToken', apiResponse.data.refreshToken, {
//         httpOnly: true,
//         sameSite: 'lax',
//         secure: process.env.DOMAIN === process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN,
//         path: '/',
//         expires: refreshTokenExp || undefined,
//       });
//     }
//     return response;
//   } catch (error) {
//     return errorResponse(error);
//   }
// };

// export const PUT = async (request: NextRequest) => {
//   const url = new URL(request.url);
//   const endPoint = url.pathname.replace(/^\/api/, '');
//   try {
//     const apiResponse = await axiosServerHelper.put(endPoint, await request.json());
//     if (isEmpty(apiResponse.data))
//       return new NextResponse(null, {
//         status: apiResponse.status,
//       });
//     return NextResponse.json(apiResponse.data, { status: apiResponse.status });
//   } catch (error) {
//     return errorResponse(error);
//   }
// };

// export const PATCH = async (request: NextRequest) => {
//   const url = new URL(request.url);
//   const endPoint = url.pathname.replace(/^\/api/, '');
//   try {
//     const apiResponse = await axiosServerHelper.patch(endPoint, await request.json());
//     if (isEmpty(apiResponse.data))
//       return new NextResponse(null, {
//         status: apiResponse.status,
//       });
//     return NextResponse.json(apiResponse.data, { status: apiResponse.status });
//   } catch (error) {
//     return errorResponse(error);
//   }
// };

// export const DELETE = async (request: NextRequest) => {
//   const url = new URL(request.url);
//   const endPoint = url.pathname.replace(/^\/api/, '');
//   try {
//     const apiResponse = await axiosServerHelper.delete(endPoint);
//     if (isEmpty(apiResponse.data))
//       return new NextResponse(null, {
//         status: apiResponse.status,
//       });
//     return NextResponse.json(apiResponse.data, { status: apiResponse.status });
//   } catch (error) {
//     return errorResponse(error);
//   }
// };
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

import { isAxiosError } from 'axios';
import { isError } from 'es-toolkit/compat';
import { NextResponse } from 'next/server';

const errorResponse = (error: unknown) => {
  if (isAxiosError(error)) {
    return NextResponse.json(error.response?.data ?? { message: '알 수 없는 오류가 발생했습니다.' }, {
      status: error.response?.status ?? 500,
    });
  }
  return NextResponse.json(
    {
      message: isError(error) ? error.message : String(error),
    },
    { status: 500 },
  );
};

export default errorResponse;

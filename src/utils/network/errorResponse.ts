import { isAxiosError } from 'axios';
import { isError } from 'es-toolkit/compat';
import { NextResponse } from 'next/server';

const errorResponse = (error: unknown) => {
  if (isAxiosError(error)) {
    return NextResponse.json(error.response?.data, {
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

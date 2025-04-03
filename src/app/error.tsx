'use client';

import { AxiosError, isAxiosError } from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import LeftArrowIcon from '@/assets/icons/arrow_left.svg';
import Button from '@/components/ui/buttons';
import { getErrorMessage } from '@/utils/network/getErrorMessage';

class ErrorRender {
  static renderTo400(error: AxiosError) {
    return <Layout title='400' subTitle='잘못된 요청입니다.' description={getErrorMessage(error)} />;
  }
  static renderTo401(error: AxiosError) {
    return <Layout title='401' subTitle='세션이 만료되었습니다.' description={getErrorMessage(error)} />;
  }
  static renderTo500(error: AxiosError) {
    return <Layout title='500' subTitle='서버에 오류가 발생했습니다.' description={getErrorMessage(error)} />;
  }
  static renderToOther(error: unknown) {
    return <Layout title='Unknown' subTitle='알 수 없는 오류가 발생했습니다.' description={getErrorMessage(error)} />;
  }
}

const errorStatus = {
  400: ErrorRender.renderTo400,
  401: ErrorRender.renderTo401,
  500: ErrorRender.renderTo500,
  other: ErrorRender.renderToOther,
};

export default function RootError({ error }: { error: unknown }) {
  if (isAxiosError(error)) {
    switch (error.status) {
      case 400:
      case 401:
      case 500:
        return errorStatus[error.status](error);
      default:
        return errorStatus['other'](error);
    }
  } else {
    return errorStatus['other'](error);
  }
}

interface LayoutProps {
  title: string;
  subTitle: string;
  description: string;
}

function Layout({ title, subTitle, description }: LayoutProps) {
  return (
    <div className='flex min-h-dvh items-center justify-center'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <h1 className='animate-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-clip-text text-9xl font-semibold text-transparent'>{title}</h1>

        <div className='space-y-4'>
          <h2 className='text-2xl font-bold'>{subTitle}</h2>
          <p>{description}</p>

          <div className='flex flex-col justify-center gap-4 pt-4 sm:flex-row'>
            <Link href='/' className='border-black-500 hover:border-black-600 text-gray-sm flex items-center justify-center rounded-xl border px-6 py-3 font-semibold text-gray-700'>
              <Image src={LeftArrowIcon} alt='좌측 화살표 아이콘' width={20} height={20} />
              홈으로 돌아가기
            </Link>
            {title === '401' ? (
              <Button onClick={() => (window.location.href = '/login')} variant='outline' className='text-gray-700'>
                로그인 하러가기
              </Button>
            ) : (
              <Button onClick={() => window.location.reload()} variant='outline' className='text-gray-700'>
                다시 불러오기
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

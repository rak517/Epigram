import Header from '@/components/ui/header/MainHeader';
import { Pretendard } from '@/fonts';
import EditForm from '@/components/edit/EditForm';

// 목데이터로 임시 작업
const mockData = {
  content: 'ㅁㄴㅇㄴㅁㅇㄴㅁㅇ',
  author: '정재형',
  source: '유튜브',
  tags: ['에픽그램', '수정', '예시'],
};

export default function EpigramEdit() {
  return (
    <>
      <Header />
      <div className='pt-14'>
        <div className='mx-auto mt-[21px] flex h-196.25 w-78 flex-col gap-6 md:mt-9 md:h-202.75 md:w-[calc(100%-360px)] md:gap-8 xl:mt-20 xl:h-278.5 xl:w-160 xl:gap-10'>
          <p className={`h-6.5 w-full md:h-8 ${Pretendard.className} text-lg font-semibold md:text-xl xl:text-2xl`}>에픽그램 수정</p>
          <EditForm initialData={mockData} />
        </div>
      </div>
    </>
  );
}

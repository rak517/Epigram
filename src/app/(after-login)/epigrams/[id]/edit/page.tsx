import Header from '@/components/ui/header/MainHeader';
import Button from '@/components/ui/buttons/index';
import { Pretendard } from '@/fonts';
import Content from '@/components/edit/Content';
import Author from '@/components/edit/Author';
import Source from '@/components/edit/Source';
import Tags from '@/components/edit/Tags';

// 사실 한 페이지에서 구상을 하려고 했지만 가독성측면에서 분리를 하게됨
// 1. 해당 페이지에서 가독성을 위해 컴포넌트를 나눔 2. 중복되는 부분이 많다고 판단함 쓸데없이 코드 길어짐 
export default function EpigramEdit() {
  return (
    <>
      <Header></Header>
      <div className='pt-14'>
        <div className='mx-auto mt-[21px] flex h-196.25 w-78 flex-col gap-6 md:mt-9 md:h-202.75 md:w-[calc(100%-360px)] md:gap-8 xl:mt-20 xl:h-278.5 xl:w-160 xl:gap-10'>
          <p className={`h-6.5 w-full md:h-8 ${Pretendard.className} text-lg font-semibold md:text-xl xl:text-2xl`}>에픽그램 수정</p>
          <div className='bg-black-400 flex h-165.75 w-full flex-col gap-10 md:h-168.75 xl:h-234.5 xl:gap-13.5'>
            <Content />
            <Author />
            <Source />
            <Tags />
          </div>
          <Button className='bg-black-500 h-12 w-full xl:h-16'>수정 완료</Button>
        </div>
        ;
      </div>
    </>
  );
}

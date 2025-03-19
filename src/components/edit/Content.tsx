import TextArea from '../ui/textarea'; // props로 내용텍스트를 받아서 area 전달을한다

const Content = () => {
  return (
    <div className='flex h-41.5 w-full flex-col gap-2 bg-amber-200 md:h-42 xl:h-51.75 xl:gap-6'>
      <div className={`flex h-6.5 w-9.5 items-center justify-between bg-amber-50 md:h-7 md:w-10.25 xl:h-8.75 xl:w-13.25`}>
        <p className='text-md font-semibold md:text-lg xl:text-xl'>내용</p>
        <p className='flex h-3 translate-y-[2px] items-center justify-center text-lg font-medium text-[rgba(255,101,119,1)] xl:translate-y-[3px] xl:text-2xl'>*</p>
      </div>
      <TextArea className='w-full h-33' maxLength={500} ></TextArea>
    </div>
  );
};

export default Content;

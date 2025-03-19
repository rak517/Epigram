import TextArea from '../ui/textarea';

export default function Source() {
  // 출처를 받아오기만 하면됨 2개로 받아와서 위아래로 나열
  return (
    <div className='h-32 w-full bg-amber-600 md:h-32.5 xl:h-50'>
      <div className={`flex h-6.5 w-9.5 items-center justify-between bg-amber-50 md:h-7 md:w-10.25 xl:h-8.75 xl:w-13.25`}>
        <p className='text-md font-semibold md:text-lg xl:text-xl'>출처</p>
      </div>
      <TextArea maxLength={500} size='full'></TextArea>
    </div>
  );
}

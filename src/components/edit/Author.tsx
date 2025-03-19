export default function Author() { // 저자값 텍스트가 -> area에 이동 , 레디오 3칸 골라서 설정할수있는데 본인누르면 본인이름이 -> 
// 알수없음누르면 그텍스트가, 직접입력누르면 타이핑치게 
  return (
    <div className='h-29 w-full bg-amber-600 md:h-29.5 xl:h-42.75'>
      <div className={`flex h-6.5 w-9.5 items-center justify-between bg-amber-50 md:h-7 md:w-10.25 xl:h-8.75 xl:w-13.25`}>
        <p className='text-md font-semibold md:text-lg xl:text-xl'>저자</p>
        <p className='flex h-3 translate-y-[2px] items-center justify-center text-lg font-medium text-[rgba(255,101,119,1)] xl:translate-y-[3px] xl:text-2xl'>*</p>
      </div>

    </div>
    
  );
}

export default function Tags() { //tag값을 받아와야겠지 -> 태그 추가 기능과 가져온 태그를 나열
    return (
      <div className='h-32 w-full bg-amber-600 md:h-32.5 xl:h-50'>
        <div className={`flex h-6.5 w-9.5 items-center justify-between bg-amber-50 md:h-7 md:w-10.25 xl:h-8.75 xl:w-13.25`}>
          <p className='text-md font-semibold md:text-lg xl:text-xl'>태그</p>
        </div>
      </div>
    );
  }
  
import Image from 'next/image';
import FloatingButton from './FloatingButton';
import plus_ic from '@/assets/icons/plus_white.svg';
import Link from 'next/link';

export default function AddEpigramButton() {
  return (
    <Link href='/addepigram'>
      <FloatingButton className='right-3 bottom-26 flex h-12 w-[145px] items-center justify-center gap-1 px-3.5 py-3 md:right-12'>
        <Image src={plus_ic} alt='에피그램 만들기' className='text-blue-100' />
        <span className='text-md text-blue-100'>에피그램 만들기</span>
      </FloatingButton>
    </Link>
  );
}

import Image from 'next/image';
import menuIcon from '@/assets/icons/hamburgerMenuIcon.svg';
import headerLogo from '@/assets/images/headerLogo.svg';
import userIconLight from '@/assets/icons/userIconLight.svg';
import Link from 'next/link';

export default function MainHeader() {
  return (
    <header className='border-b-line-100 fixed flex w-full items-center justify-between border-b-[1px] bg-white px-6 py-[13px] md:px-[72px] md:py-[17px] xl:px-[120px] xl:py-[22px]'>
      <div className='flex items-center justify-center gap-3 md:gap-6 xl:gap-9'>
        <Image src={menuIcon} alt='메뉴 아이콘' className='md:hidden'></Image>
        <Link href={'/'}>
          <Image src={headerLogo} alt='헤더 로고' className='xl:h-9 xl:w-[131px]'></Image>
        </Link>
        <Link href={'/epigrams'} className='text-black-600 hidden leading-[26px] font-semibold md:block'>
          피드
        </Link>
        <Link href={'/search'} className='text-black-600 hidden leading-[26px] font-semibold md:block'>
          검색
        </Link>
      </div>
      <Link href={'/myapage'} className='flex gap-1.5'>
        <Image src={userIconLight} alt='유저 아이콘'></Image>
        <p className='xl:text-md text-sm font-medium text-gray-300'>김코드</p>
      </Link>
    </header>
  );
}

'use client';

import LogoutButton from '@/components/auth/LogoutButton';
import DailyEmotion from '@/components/mypage/DailyEmotion';
import EmotionCalendar from '@/components/mypage/EmotionCalendar';
import EmotionChart from '@/components/mypage/EmotionChart';
import Avatar from '@/components/ui/avatars';
import { MypageContext } from '@/context/MypageProvider';
import { useContext } from 'react';

export default function MyPage() {
  const { user } = useContext(MypageContext);

  return (
    <div className='bg-background-100'>
      <div className='shadow-custom relative mt-16 flex flex-col items-center justify-center rounded-3xl bg-blue-100 px-6 pt-[184px] pb-10 shadow-black md:pb-[63px] lg:pt-[276px] lg:pb-22'>
        <div className='absolute top-0 left-1/2 flex -translate-x-1/2 -translate-y-[40px] flex-col items-center justify-center gap-4 lg:-translate-y-[60px] lg:gap-6'>
          <Avatar src={user.image} alt='유저이미지' className='size-20 border-2 border-blue-300 lg:size-[120px]'></Avatar>
          <p className='text-black-950 text-lg font-medium lg:text-2xl'>{user.nickname}</p>
          <LogoutButton className='h-9 w-[77px] px-3.5 py-1.5 text-[14px] font-normal whitespace-nowrap lg:h-12 lg:w-[100px] lg:px-4 lg:py-2 lg:text-xl lg:font-medium'></LogoutButton>
        </div>
        <div className='flex flex-col gap-14 md:gap-15 lg:gap-41'>
          <DailyEmotion></DailyEmotion>
          <EmotionCalendar></EmotionCalendar>
          <div className='flex flex-col gap-4 lg:gap-12'>
            <h2 className='text-lg font-semibold lg:text-2xl'>감정 차트</h2>
            <EmotionChart></EmotionChart>
          </div>
        </div>
      </div>
    </div>
  );
}

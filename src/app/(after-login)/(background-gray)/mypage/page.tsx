import DailyEmotion from '@/components/mypage/DailyEmotion';
import EmotionCalendar from '@/components/mypage/EmotionCalendar';
import EmotionChartSection from '@/components/mypage/EmotionChartSection';
import MyEpigramComments from '@/components/mypage/MyEpigramComments';
import UserProfileLayout from '@/components/mypage/UserProfileLayout';

export default function MyPage() {
  return (
    <div className='bg-background-100 pt-[116px] lg:pt-[208px]'>
      <div className='shadow-custom relative flex flex-col items-center justify-center rounded-3xl bg-blue-100 px-6 pt-[184px] pb-10 shadow-black md:pb-[63px] lg:pt-[276px] lg:pb-22'>
        <UserProfileLayout></UserProfileLayout>
        <div className='flex flex-col gap-14 md:gap-15 lg:gap-41'>
          <DailyEmotion></DailyEmotion>
          <EmotionCalendar></EmotionCalendar>
          <EmotionChartSection></EmotionChartSection>
        </div>
      </div>
      <div className='mx-auto w-[360px] pt-14 pb-[78px] md:w-[384px] md:pb-[102px] lg:w-[640px] lg:pt-24 lg:pb-[156px]'>
        <MyEpigramComments></MyEpigramComments>
      </div>
    </div>
  );
}

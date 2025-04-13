'use client';

import dynamic from 'next/dynamic';

export default function EmotionChartSection() {
  const EmotionChart = dynamic(() => import('@/components/mypage/EmotionChart'), {
    ssr: false,
    loading: () => <p>감정 차트 로딩 중... </p>,
  });
  return (
    <div className='flex flex-col gap-4 lg:gap-12'>
      <h2 className='text-lg font-semibold lg:text-2xl'>감정 차트</h2>
      <EmotionChart></EmotionChart>
    </div>
  );
}

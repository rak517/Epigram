'use client';

import { useGetMonthlyEmotionLogs } from '@/apis/emotion-log/queries';
import { useGetUser } from '@/apis/user/queries';
import EmotionChartData from './EmotionChartData';
import Emotion from '../ui/emotion';

export default function EmotionChart() {
  const { data: userData } = useGetUser();

  const { data: chartData } = useGetMonthlyEmotionLogs({
    userId: userData?.id ?? 0,
    year: 2025,
    month: 3,
  });

  const emotionColors: { [key: string]: { fill: string; tailwindColor: string } } = {
    MOVED: { fill: 'hsl(41, 95%, 67%)', tailwindColor: 'bg-illust-yellow' },
    HAPPY: { fill: 'hsl(162, 46%, 51%)', tailwindColor: 'bg-illust-green' },
    SAD: { fill: 'hsl(214, 82%, 63%)', tailwindColor: 'bg-illust-blue' },
    WORRIED: { fill: 'hsl(248, 64%, 70%)', tailwindColor: 'bg-illust-purple' },
    ANGRY: { fill: 'hsl(351, 69%, 66%)', tailwindColor: 'bg-illust-red' },
  };

  const emotionCount = chartData?.reduce((acc: { [key: string]: number }, data) => {
    acc[data.emotion] = (acc[data.emotion] || 0) + 1;
    return acc;
  }, {});

  const totalDataCount = chartData?.length || 0;

  const chartDataWithPercent = chartData
    ?.map((data) => {
      const percent = totalDataCount > 0 ? Math.round(((emotionCount?.[data.emotion] || 0) / totalDataCount) * 100 * 10) / 10 : 0;

      return {
        ...data,
        percent,
      };
    })
    .sort((a, b) => b.percent - a.percent);

  const highestEmotion = chartDataWithPercent?.[0] ?? null;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className='flex w-[312px] justify-center rounded-lg border border-blue-200 bg-blue-100 px-[38px] py-[22px] md:w-[384px] md:px-[61px] xl:w-[640px] xl:px-[112px]'>
      <div className='flex w-[235px] items-center justify-between md:w-[263px] xl:w-[416px]'>
        <svg width='120' height='120' viewBox='0 0 180 180' className='xl:h-[180px] xl:w-[180px]'>
          {chartDataWithPercent?.map((emotion, index) => {
            const strokeDash = (emotion.percent / 100) * circumference;

            const style = {
              strokeDasharray: `${strokeDash} ${circumference}`,
              strokeDashoffset: -offset,
            };
            offset += strokeDash;

            const color = emotionColors[emotion.emotion];

            return <circle key={index} cx='90' cy='90' r={radius} fill='transparent' strokeWidth='8' stroke={color.fill} style={style} transform='rotate(-90 90 90)' />;
          })}

          {highestEmotion && (
            <foreignObject x='60' y='60' width='60' height='60'>
              <div className='flex h-full w-full flex-col items-center justify-center'>
                <Emotion emotion={highestEmotion.emotion} />
                <p className='text-black-600 text-lg font-bold'>{highestEmotion.emotion}</p>
              </div>
            </foreignObject>
          )}
        </svg>
        <ul className='flex flex-col gap-2'>
          {chartDataWithPercent?.map((data) => {
            const emotionColor = emotionColors[data.emotion];

            return (
              <li key={data.id}>
                <EmotionChartData emotion={data.emotion} emotionColor={emotionColor.tailwindColor} percent={data.percent} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

'use client';

import { useGetMonthlyEmotionLogs } from '@/apis/emotion-log/queries';
import { useGetUser } from '@/apis/user/queries';
import EmotionChartData from './EmotionChartData';
import Emotion from '../ui/emotion';
import { EMOTION_STATUS, EMOTION_STATUS_KR } from '@/constants/emotions';
import { useEffect, useState } from 'react';
import { Emotion as EmotionType } from '@/apis/emotion-log/types';
import { debounce } from 'es-toolkit';

export default function EmotionChart() {
  const { data: userData } = useGetUser();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const { data: chartData } = useGetMonthlyEmotionLogs(
    {
      userId: userData?.id ?? 0,
      year: currentYear,
      month: currentMonth,
    },
    {
      enabled: !!userData?.id,
    },
  );

  const [size, setSize] = useState<'2xs' | 'xs'>('2xs');
  const [chartEmotionSize, setChartEmotionSize] = useState<'2lg' | 'xs'>('xs');

  useEffect(() => {
    const updateSize = debounce(() => {
      setSize(window.innerWidth >= 1024 ? 'xs' : '2xs');
      setChartEmotionSize(window.innerWidth >= 1024 ? '2lg' : 'xs');
    }, 100);

    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const emotionColors: { [key: string]: { fill: string; tailwindColor: string } } = {
    MOVED: { fill: 'hsl(41, 95%, 67%)', tailwindColor: 'bg-illust-yellow' },
    HAPPY: { fill: 'hsl(162, 46%, 51%)', tailwindColor: 'bg-illust-green' },
    SAD: { fill: 'hsl(214, 82%, 63%)', tailwindColor: 'bg-illust-blue' },
    WORRIED: { fill: 'hsl(248, 64%, 70%)', tailwindColor: 'bg-illust-purple' },
    ANGRY: { fill: 'hsl(351, 69%, 66%)', tailwindColor: 'bg-illust-red' },
  };

  const emotionCount = chartData
    ? chartData.reduce((acc: { [key: string]: number }, data) => {
        acc[data.emotion] = (acc[data.emotion] || 0) + 1;
        return acc;
      }, {})
    : {};

  const totalDataCount = chartData?.length || 0;

  const chartDataWithPercent = EMOTION_STATUS.map((emotion) => {
    const percent = totalDataCount > 0 ? Math.round((emotionCount[emotion] / totalDataCount) * 100 * 10) / 10 : 0;
    return {
      emotion,
      percent: isNaN(percent) ? 0 : percent,
    };
  }).sort((a, b) => b.percent - a.percent);

  const highestEmotion = chartDataWithPercent?.[0] ?? null;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className='flex w-[312px] justify-center rounded-lg border border-blue-200 bg-blue-100 px-[38px] py-[22px] md:w-[384px] md:px-[61px] lg:w-[640px] lg:px-[112px]'>
      <div className='flex w-[235px] items-center justify-between md:w-[263px] lg:w-[416px]'>
        <svg width='120' height='120' viewBox='0 0 180 180' className='lg:h-[180px] lg:w-[180px]'>
          {chartDataWithPercent?.map((emotion, index) => {
            const strokeDash = (emotion.percent / 100) * circumference;
            const style = {
              strokeDasharray: `${strokeDash - 10} ${circumference}`,
              strokeDashoffset: -offset,
            };
            offset += strokeDash;

            const color = emotionColors[emotion.emotion];

            return (
              <circle
                key={index}
                strokeLinecap='round'
                cx='90'
                cy='90'
                r={radius}
                fill='transparent'
                strokeWidth='8'
                stroke={emotion.percent ? color.fill : undefined}
                style={emotion.percent ? style : undefined}
                transform='rotate(-90 90 90)'
              />
            );
          })}
          <g>
            <ellipse cx='90' cy='90' rx='47' ry='47' stroke='#ECEFF4' strokeWidth='1.00104' strokeDasharray='1 5.01' fill='transparent' />
            {highestEmotion && (
              <foreignObject x='60' y='60' width='60' height='60'>
                <div className='flex h-full w-full flex-col items-center justify-center'>
                  <Emotion emotion={highestEmotion.emotion as EmotionType} size={chartEmotionSize} />
                  <p className='text-black-600 text-lg font-bold md:text-xl'>{EMOTION_STATUS_KR[EMOTION_STATUS.indexOf(highestEmotion.emotion as EmotionType)]}</p>
                </div>
              </foreignObject>
            )}
          </g>
        </svg>
        <ul className='flex flex-col gap-2'>
          {chartDataWithPercent?.map((data, index) => {
            const emotionColor = emotionColors[data.emotion];

            return (
              <li key={index}>
                <EmotionChartData
                  emotion={data.emotion as EmotionType}
                  emotionColor={emotionColor.tailwindColor}
                  percent={data.percent}
                  size={size}
                  className={index === 0 ? 'text-black-600' : 'text-gray-200'}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

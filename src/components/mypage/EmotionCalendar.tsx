'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import ArrowLeft from '@/assets/icons/arrow_left.svg';
import ArrowRight from '@/assets/icons/arrow_right.svg';
import { CALENDAR_ROW } from '@/constants/calendar';
import { cn } from '@/utils/cn';
import Emotion from '@/components/ui/emotion';
import RoundedButton from '@/components/ui/buttons/roundedButton';
import { EMOTION_STATUS, EMOTION_STATUS_KR } from '@/constants/emotions';
import { MypageContext } from '@/context/MypageProvider';

const TEXT_FLEX_CENTER_ALIGN = 'flex flex-col items-center justify-center lg:gap-2';
const ITEM_SIZE = 'size-11 md:size-14 lg:size-20';
const ITEM_TEXT_STYLE = 'font-semibold text-gray-200 text-lg lg:text-2xl';

type EmotionKr = (typeof EMOTION_STATUS_KR)[number];

export default function EmotionCalendar() {
  const { currentDate, setCurrentDate, userEmotion } = useContext(MypageContext);
  const [selectedItem, setSelectedItem] = useState<EmotionKr | ''>('');

  if (!currentDate) return null;

  const year = currentDate.year();
  const month = currentDate.month();
  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const daysInMonth = Array.from({ length: endOfMonth.date() }, (_, i) => i + 1);
  const prevMonthEnd = startOfMonth.subtract(1, 'day').date();

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentDate(currentDate.add(direction === 'next' ? 1 : -1, 'month'));
  };

  const makeDays = (days: number[], className?: string, isDayInMonth = false) =>
    days.map((day, index) => {
      const isToday = currentDate.year() === dayjs().year() && currentDate.month() === dayjs().month() && day === dayjs().date();
      const matchingLog = userEmotion?.find((log) => dayjs(log.createdAt).date() === day);

      return (
        <div
          key={`days-${index}`}
          className={cn(TEXT_FLEX_CENTER_ALIGN, ITEM_SIZE, ITEM_TEXT_STYLE, className, isDayInMonth && isToday && 'border-illust-red t text-illust-red rounded-md border-[3px]')}
        >
          {isDayInMonth && matchingLog && (selectedItem === '' || selectedItem === EMOTION_STATUS_KR[EMOTION_STATUS.indexOf(matchingLog.emotion)]) ? (
            <>
              <span className='text-[8px] md:text-[10px] lg:text-lg'>{day}</span>
              <Emotion emotion={matchingLog.emotion} className='size-6 lg:size-9' />
            </>
          ) : (
            <span>{day}</span>
          )}
        </div>
      );
    });

  return (
    <div className='flex w-full flex-col gap-4 lg:gap-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-center text-lg font-semibold lg:text-2xl'>
          {year}년 {month + 1}월
        </h2>
        <div className='flex items-center gap-6'>
          <FilterButton selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
          <Image src={ArrowLeft} alt='이전 월 선택 이미지' width={36} height={36} className='size-5 cursor-pointer rounded-md hover:bg-blue-300 lg:size-9' onClick={() => handleMonthChange('prev')} />
          <Image src={ArrowRight} alt='이후 월 선택 이미지' width={36} height={36} className='size-5 cursor-pointer rounded-md hover:bg-blue-300 lg:size-9' onClick={() => handleMonthChange('next')} />
        </div>
      </div>
      <div className='grid grid-cols-7 justify-items-center'>
        {CALENDAR_ROW['KR'].map((day) => (
          <div key={day} className={cn(TEXT_FLEX_CENTER_ALIGN, ITEM_SIZE, ITEM_TEXT_STYLE, 'border-y border-blue-200')}>
            {day}
          </div>
        ))}
        {makeDays(
          Array(startOfMonth.day())
            .fill(null)
            .map((_, index) => prevMonthEnd - startOfMonth.day() + 1 + index),
          'border-b border-blue-200',
        )}
        {makeDays(daysInMonth, 'border-b border-blue-200 text-gray-500', true)}
        {makeDays(
          Array(6 - endOfMonth.day())
            .fill(null)
            .map((_, index) => index + 1),
          'border-b border-blue-200',
        )}
      </div>
    </div>
  );
}

function FilterButton({ selectedItem, setSelectedItem }: { selectedItem: EmotionKr | ''; setSelectedItem: (emotion: EmotionKr | '') => void }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const handleClick = (emotion: EmotionKr | '') => {
    setSelectedItem(emotion);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={filterRef}>
      <RoundedButton className='h-[30px] rounded-2xl px-4 lg:h-[52px]' onClick={() => setIsFilterOpen(!isFilterOpen)}>
        필터 {`: ${selectedItem ? selectedItem : '없음'}`}
      </RoundedButton>
      {isFilterOpen && (
        <ul className='absolute top-[30px] right-0 w-28 rounded-md border border-gray-200 bg-white shadow-lg lg:top-[52px] lg:w-32' onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <li key='none' className='text-md lg:text-2lg flex cursor-pointer items-center justify-center gap-4 py-2 font-semibold hover:bg-blue-200' onClick={() => handleClick('')}>
            필터 제거
          </li>
          {EMOTION_STATUS.map((emotion, i) => (
            <li key={emotion} className='flex cursor-pointer items-center justify-center gap-4 py-2 text-sm hover:bg-blue-200 lg:text-lg' onClick={() => handleClick(EMOTION_STATUS_KR[i])}>
              <Emotion emotion={emotion} className='size-6 lg:size-8' />
              {EMOTION_STATUS_KR[i]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

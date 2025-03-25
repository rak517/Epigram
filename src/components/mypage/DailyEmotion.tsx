'use client';

import { AnimatePresence, motion } from 'motion/react';
import { EMOTION_STATUS, EMOTION_STATUS_KR } from '@/constants/emotions';
import EmotionButton from '@/components/ui/emotionButton';
import { useGetTodayEmotionLog, useOptimisticEmotionLog } from '@/apis/emotion-log/queries';
import { Emotion } from '@/apis/emotion-log/types';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useGetUser } from '@/apis/user/queries';

export default function DailyEmotion() {
  const { mutate: updateEmotionLog } = useOptimisticEmotionLog();
  const { data: user } = useGetUser();
  const { data: dailyEmotion } = useGetTodayEmotionLog(user?.id, {
    enabled: !!user,
  });
  const [date, setDate] = useState<string | null>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(dailyEmotion?.emotion ?? null);

  const handleEmotionClick = async (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    updateEmotionLog(
      { emotion },
      {
        onError: (_, __, context) => {
          setSelectedEmotion(context?.emotion ?? null);
        },
      },
    );
  };

  useEffect(() => {
    setSelectedEmotion(dailyEmotion?.emotion ?? null);
  }, [dailyEmotion]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = dayjs(today).format('YYYY.MM.DD');
    setDate(formattedDate);
  }, []);

  return (
    <section>
      <AnimatePresence>
        {
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 1 } }} className='flex flex-col items-center gap-6 lg:gap-12'>
            <div className='flex w-full items-center justify-between'>
              <h2 className='text-black-600 text-lg font-semibold md:text-2xl'>오늘의 감정</h2>
              <span className='text-lg text-blue-400 lg:text-xl'>{date}</span>
            </div>
            <div className='flex justify-center gap-2 lg:gap-4'>
              {EMOTION_STATUS.map((emotion, index) => (
                <motion.div key={index} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} whileHover={{ y: -8, transition: { duration: 0.2 } }} className='flex flex-col items-center gap-2'>
                  <EmotionButton emotion={emotion} isInteractive onClick={() => handleEmotionClick(emotion)} buttonVariant={selectedEmotion === emotion} />
                  <span className='text-sub-blue-1 lg:text-2lg text-sm font-semibold md:text-lg'>{EMOTION_STATUS_KR[index]}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </section>
  );
}

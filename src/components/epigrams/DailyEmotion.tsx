'use client';

import { AnimatePresence, motion } from 'motion/react';
import { EMOTION_STATUS, EMOTION_STATUS_KR } from '@/constants/emotions';
import EmotionButton from '@/components/ui/emotionButton';
import { useGetTodayEmotionLog, useOptimisticEmotionLog } from '@/apis/emotion-log/queries';
import { Emotion } from '@/apis/emotion-log/types';
import { useEffect, useState } from 'react';
import { useGetUser } from '@/apis/user/queries';

export default function DailyEmotion() {
  const { mutate: updateEmotionLog } = useOptimisticEmotionLog();
  const { data: user } = useGetUser();
  const { data: dailyEmotion, isFetching } = useGetTodayEmotionLog(user?.id, {
    enabled: !!user,
  });
  const [isPosting, setIsPosting] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(dailyEmotion?.emotion ?? null);

  const handleEmotionClick = async (emotion: Emotion) => {
    setIsPosting(true);
    updateEmotionLog(
      { emotion },
      {
        onError: (_, __, context) => {
          setSelectedEmotion(context?.emotion ?? null);
          setIsPosting(false);
        },
        onSettled: () => {
          setIsPosting(false);
        },
      },
    );
  };

  useEffect(() => {
    setSelectedEmotion(dailyEmotion?.emotion ?? null);
  }, [dailyEmotion]);

  return (
    <section className='flex flex-col gap-4 md:gap-8'>
      <AnimatePresence>
        {!isFetching && !dailyEmotion && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 1 } }} className='flex flex-col items-center gap-4'>
            <h2 className='text-black-600 text-lg font-semibold md:text-2xl'>오늘의 감정은 어떤가요?</h2>
            <div className='flex justify-center gap-4'>
              {EMOTION_STATUS.map((emotion, index) => (
                <motion.div key={index} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} whileHover={{ y: -8, transition: { duration: 0.2 } }} className='flex flex-col items-center gap-2'>
                  <EmotionButton
                    emotion={emotion}
                    isInteractive
                    onClick={() => handleEmotionClick(emotion)}
                    disabled={isPosting}
                    emotionVariant={isPosting ? 'grayScales' : 'default'}
                    buttonVariant={selectedEmotion === emotion}
                  />
                  <span className='text-sub-blue-1 lg:text-2lg text-sm font-semibold md:text-lg'>{EMOTION_STATUS_KR[index]}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

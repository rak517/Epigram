'use client';

import { AnimatePresence, motion } from 'motion/react';
import { EMOTION_STATUS, EMOTION_STATUS_KR } from '@/constants/emotions';
import EmotionButton from '@/components/ui/emotionButton';

export default function DailyEmotion() {
  return (
    <section className='flex flex-col gap-4 md:gap-8'>
      <h2 className='text-black-600 text-lg font-semibold md:text-2xl'>오늘의 감정은 어떤가요?</h2>
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='flex justify-center gap-4'>
          {EMOTION_STATUS.map((emotion, index) => (
            <motion.div key={index} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} whileHover={{ y: -8, transition: { duration: 0.2 } }} className='flex flex-col items-center gap-2'>
              <EmotionButton emotion={emotion} isInteractive />
              <span className='text-sub-blue-1 lg:text-2lg text-sm font-semibold md:text-lg'>{EMOTION_STATUS_KR[index]}</span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

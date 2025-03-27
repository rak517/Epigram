import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { MypageContext as CreateContext } from './types';
import { useGetUser } from '@/apis/user/queries';
import dayjs, { Dayjs } from 'dayjs';
import { useGetMonthlyEmotionLogs } from '@/apis/emotion-log/queries';

export const MypageContext = createContext<CreateContext>({
  currentDate: dayjs(),
  setCurrentDate: () => {},
  userEmotion: [],
});

export default function MypageProvider({ children }: PropsWithChildren) {
  const [currentDate, setCurrentDate] = useState<Dayjs | null>(dayjs());

  const { data: user } = useGetUser();

  const emotionLogParams = {
    userId: user?.id,
    year: currentDate?.year(),
    month: Number(currentDate?.month()) + 1,
  };

  const { data: userEmotion } = useGetMonthlyEmotionLogs(emotionLogParams, {
    enabled: !!user && !!currentDate,
  });

  useEffect(() => {
    setCurrentDate(dayjs);
  }, []);

  if (userEmotion !== undefined) {
    return <MypageContext.Provider value={{ currentDate, setCurrentDate, userEmotion }}>{children}</MypageContext.Provider>;
  }
}

import { createContext, PropsWithChildren, useState } from 'react';
import { MypageContext as CreateContext } from './types';
import { useGetUser } from '@/apis/user/queries';
import dayjs, { Dayjs } from 'dayjs';
import { useGetMonthlyEmotionLogs } from '@/apis/emotion-log/queries';

export const MypageContext = createContext<CreateContext>({
  currentDate: dayjs(),
  setCurrentDate: () => {},
  userEmotion: [],
  user: {
    image: '',
    createdAt: '',
    updatedAt: '',
    teamId: '',
    nickname: '',
    id: 0,
  },
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

  if (userEmotion !== undefined && user !== undefined) {
    return <MypageContext.Provider value={{ currentDate, setCurrentDate, userEmotion, user }}>{children}</MypageContext.Provider>;
  }
}

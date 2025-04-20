import { createContext, PropsWithChildren, useState } from 'react';
import { MypageContext as CreateContext } from './types';
import { useGetUser } from '@/apis/user/queries';
import dayjs, { Dayjs } from 'dayjs';
import { useGetMonthlyEmotionLogs } from '@/apis/emotion-log/queries';

const defaultUser = {
  image: process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL ?? '',
  createdAt: '',
  updatedAt: '',
  teamId: '',
  nickname: '사용자',
  id: 0,
};

export const MypageContext = createContext<CreateContext>({
  currentDate: dayjs(),
  setCurrentDate: () => {},
  userEmotion: [],
  user: defaultUser,
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

  return (
    <MypageContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        userEmotion: userEmotion ?? [],
        user: user ?? defaultUser,
      }}
    >
      {children}
    </MypageContext.Provider>
  );
}

import { EmotionChartData as EmotionChartDataProps } from '@/apis/emotion-log/types';
import Emotion from '../ui/emotion';

export default function EmotionChartData({ emotion, percent, emotionColor }: EmotionChartDataProps) {
  return (
    <div className='flex items-center gap-2'>
      <div className={`${emotionColor} h-2 w-2 rounded-xs md:h-4 md:w-4`}></div>
      <Emotion emotion={emotion}></Emotion>
      <p>{percent}%</p>
    </div>
  );
}

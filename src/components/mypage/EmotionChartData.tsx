import { EmotionChartData as EmotionChartDataProps } from '@/apis/emotion-log/types';
import Emotion from '../ui/emotion';

export default function EmotionChartData({ emotion, percent, emotionColor, size, className }: EmotionChartDataProps) {
  return (
    <div className='flex items-center gap-2'>
      <div className={`${emotionColor} h-2 w-2 rounded-xs lg:h-4 lg:w-4`}></div>
      <Emotion emotion={emotion} size={size}></Emotion>
      <p className={`${className} text-xs font-semibold lg:text-xl`}>{percent}%</p>
    </div>
  );
}

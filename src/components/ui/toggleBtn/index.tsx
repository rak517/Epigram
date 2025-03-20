import React from 'react';
import { Pretendard } from '@/fonts';

interface ToggleButtonProps {
  isOn: boolean;
  onToggle: (newState: boolean) => void;
  size?: 'small' | 'medium';
  label?: string; // label 추가해서 성락님 의견대로 커스텀 가능하게 했습니다.
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isOn, onToggle, size = 'medium', label = '공개' }) => {
  const sizeClasses = {
    small: 'w-8 h-4',
    medium: 'w-10.5 h-6',
  };

  const circleSize = {
    small: 'w-2.5 h-2.5',
    medium: 'w-4 h-4',
  };

  const textSize = {
    small: 'text-xs',
    medium: 'text-sm',
  };

  const togglePosition = {
    small: isOn ? 'left-[calc(100%-14px)]' : 'left-1',
    medium: isOn ? 'left-[calc(100%-20px)]' : 'left-1',
  };

  return (
    <div className='inline-flex items-center gap-2'>
      <span className={`${Pretendard.className} font-semibold text-gray-400 ${textSize[size]}`}>{label}</span>

      <button
        onClick={() => onToggle(!isOn)}
        className={`relative flex items-center px-1 ${sizeClasses[size]} rounded-full ${isOn ? 'bg-black-600' : 'bg-gray-300'} transition-colors duration-500 ease-in-out`}
      >
        <span className={`absolute rounded-full bg-white ${circleSize[size]} shadow-md transition-transform duration-1000 ease-in-out ${togglePosition[size]}`} />
      </button>
    </div>
  );
};

export default ToggleButton;

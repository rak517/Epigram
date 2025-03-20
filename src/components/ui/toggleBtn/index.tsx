import React from 'react';
import { Pretendard } from '@/fonts';

interface ToggleButtonProps {
  isSelected: boolean;
  onToggle: (newState: boolean) => void;
  size?: 'sm' | 'md';
  label?: string; // label 추가해서 성락님 의견대로 커스텀 가능하게 했습니다.
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isSelected, onToggle, size = 'md', label = '공개' }) => {
  const sizeClasses = {
    sm: 'w-8 h-4',
    md: 'w-10.5 h-6',
  };

  const circleSize = {
    sm: 'w-2.5 h-2.5',
    md: 'w-4 h-4',
  };

  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
  };

  const togglePosition = {
    sm: isSelected ? 'left-[calc(100%-14px)]' : 'left-1',
    md: isSelected ? 'left-[calc(100%-20px)]' : 'left-1',
  };

  return (
    <div className='inline-flex items-center gap-2'>
      <span className={`${Pretendard.className} font-semibold text-gray-400 ${textSize[size]}`}>{label}</span>

      <button
        onClick={() => onToggle(!isSelected)}
        className={`relative flex items-center px-1 ${sizeClasses[size]} rounded-full ${isSelected ? 'bg-black-600' : 'bg-gray-300'} transition-colors duration-500 ease-in-out`}
      >
        <span className={`absolute rounded-full bg-white ${circleSize[size]} shadow-md transition-transform duration-1000 ease-in-out ${togglePosition[size]}`} />
      </button>
    </div>
  );
};

export default ToggleButton;

import React from 'react';
import { Pretendard } from '@/fonts';

interface ToggleButtonProps {
  isPublic: boolean;
  onToggle: (newState: boolean) => void;
  size?: 'small' | 'medium';
  label?: string; // label 추가해서 성락님 의견대로 커스텀 가능하게 했습니다.
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isPublic,
  onToggle,
  size = 'medium',
  label = '공개'
}) => {
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
    small: isPublic ? 'left-[calc(100%-14px)]' : 'left-1',  
    medium: isPublic ? 'left-[calc(100%-20px)]' : 'left-1', 
  };

  return (
    <div className="inline-flex items-center gap-2">
      <span className={`${Pretendard.className} text-gray-400 font-semibold ${textSize[size]}`}>
        {label}
      </span>

      <button
        onClick={() => onToggle(!isPublic)}
        className={`relative flex items-center px-1 ${sizeClasses[size]} rounded-full 
          ${isPublic ? 'bg-black-600' : 'bg-gray-300'} transition-colors duration-500 ease-in-out`}
      >
        <span
          className={`absolute bg-white rounded-full ${circleSize[size]} shadow-md transition-transform duration-1000 ease-in-out
            ${togglePosition[size]}`}
        />
      </button>
    </div>
  );
};

export default ToggleButton;

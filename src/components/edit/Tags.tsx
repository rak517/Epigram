'use client';

import { useState } from 'react';
import TextArea from '../ui/textarea';
import XIcon from '@/assets/icons/X.svg';
import Image from 'next/image';

interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  required?: boolean;
  error?: string;
}

export default function TagInput({ value = [], onChange, label = '태그', required, error }: TagInputProps) {
  const [newTag, setNewTag] = useState('');
  const [showAll, setShowAll] = useState(false); // 태그 모두 보기 토글 상태

  const handleTagInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !value.includes(newTag.trim()) && value.length < 3) {
      onChange([...value, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className='flex w-full flex-col gap-2 md:gap-4 xl:gap-6'>
      <div className='flex items-center justify-between'>
        <p className='text-md font-semibold md:text-lg xl:text-xl'>{label}</p>
        {required && <p className='text-lg font-medium text-red-500'>*</p>}
      </div>

      <TextArea
        placeholder='입력하여 태그 작성 (최대 10자, 최대 3개)'
        value={newTag}
        onChange={handleTagInputChange}
        onKeyDown={handleKeyDown}
        size={'source'}
        disabled={value.length >= 3} // 3개 이상이면 입력창 비활성화
      />

      {/* 태그 목록 */}
      <div className='flex flex-wrap gap-2'>
        {(showAll ? value : value.slice(0, 2)).map((tag, index) => (
          <span key={index} className='relative flex items-center rounded-full bg-gray-100 px-4 py-1 text-lg'>
            {tag}
            <button type='button' className='ml-2' onClick={() => handleRemoveTag(tag)}>
              <Image src={XIcon} alt='XIcon' />
            </button>
          </span>
        ))}

        {/* 더보기 버튼 */}
        {value.length > 2 && !showAll && (
          <button className='text-blue-500 hover:underline' onClick={() => setShowAll(true)}>
            +{value.length - 2}개 더보기
          </button>
        )}
        {showAll && (
          <button className='text-blue-500 hover:underline' onClick={() => setShowAll(false)}>
            닫기
          </button>
        )}
      </div>

      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  );
}

'use client';

import TextArea from '../ui/textarea';
import { useState } from 'react';

interface TagsProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export default function Tags({ tags, onTagsChange }: TagsProps) {
  const [newTag, setNewTag] = useState('');

  const handleTagInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      // 비어있지 않고 중복되지 않으면
      onTagsChange([...tags, newTag.trim()]); // 태그 추가
      setNewTag(''); // 입력 필드 초기화
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleAddTag(); // 엔터키 눌렀을 때 태그 추가
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove)); // 삭제할 태그를 제외한 나머지 태그들로 상태 업데이트
  };

  return (
    <div className='flex h-32 w-full flex-col gap-2 md:h-35.5 xl:h-49.5 xl:gap-6'>
      <div className={`flex h-6.5 w-9.5 items-center justify-between md:h-7 md:w-10.25 xl:h-8.75 xl:w-13.25`}>
        <p className='text-md font-semibold md:text-lg xl:text-xl'>태그</p>
      </div>
      <div className='flex h-25.25 w-full flex-col gap-3.75 md:h-27 md:gap-4 xl:h-35.5 xl:gap-5.5'>
        <TextArea placeholder='입력하여 태그 작성 (최대 10자)' size={'source'} maxLength={10} value={newTag} onChange={handleTagInputChange} onKeyDown={handleKeyDown} />
        <div className='h-10.5 w-full md:h-12 xl:h-14'>
          {tags.length > 0 && (
            <div className='flex h-full flex-wrap gap-2 xl:gap-4'>
              {tags.map((tag, index) => (
                <span key={index} className='relative flex h-full items-center justify-center rounded-full bg-gray-100 px-4 py-1 text-lg md:text-xl xl:text-2xl'>
                  {tag}
                  <button type='button' className='text-md absolute top-[5px] right-[4px] text-red-500 hover:text-red-700 md:top-[8px] xl:top-[11px]' onClick={() => handleRemoveTag(tag)}>
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

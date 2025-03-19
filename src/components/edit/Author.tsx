'use client';

import TextArea from '../ui/textarea';
import { RadioGroup } from '../ui/radio/RadioGroup';
import { RadioItem } from '../ui/radio/RadioItem';
import { useState } from 'react';

interface AuthorProps {
  author: string;
  onAuthorChange: (value: string) => void;
}

export default function Author({ author, onAuthorChange }: AuthorProps) {
  const [selected, setSelected] = useState('myself');
  const [inputValue, setInputValue] = useState(author);

  const handleRadioChange = (value: string) => {
    setSelected(value);
    if (value === 'myself') {
      setInputValue(author);
    } else if (value === 'unknown') {
      setInputValue('알 수 없음');
    } else {
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value); // 텍스트 입력값 업데이트
    onAuthorChange(e.target.value); // 부모에게 상태 변경 알리기
  };

  return (
    <div className='flex h-29 w-full flex-col gap-2 md:h-29.5 xl:h-42.75 xl:gap-6'>
      <div className={`flex h-6.5 w-9.5 items-center justify-between md:h-7 md:w-10.25 xl:h-8.75 xl:w-13.25`}>
        <p className='text-md font-semibold md:text-lg xl:text-xl'>저자</p>
        <p className='flex h-3 translate-y-[2px] items-center justify-center text-lg font-medium text-[rgba(255,101,119,1)] xl:translate-y-[3px] xl:text-2xl'>*</p>
      </div>

      <div className='flex h-20.5 w-full flex-col gap-3 xl:h-28 xl:gap-4'>
        <RadioGroup className='flex h-6.5 w-full xl:h-8' defaultValue={selected} onValueChange={handleRadioChange}>
          <RadioItem radioSize='sm' value='custom' id='custom' label='직접 입력' />
          <RadioItem radioSize='sm' value='unknown' id='unknown' label='알 수 없음' />
          <RadioItem radioSize='sm' value='myself' id='myself' label='본인' />
        </RadioGroup>
        <TextArea size={'source'} maxLength={20} value={inputValue} onChange={handleInputChange} />
      </div>
    </div>
  );
}

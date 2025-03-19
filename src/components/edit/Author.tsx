'use client';

import TextArea from '../ui/textarea';
import { RadioGroup } from '../ui/radio/RadioGroup';
import { RadioItem } from '../ui/radio/RadioItem';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { useEffect, useState } from 'react';

type FormData = {
  content: string;
  author: string;
  source: string;
  tags: string[];
};

interface AuthorProps {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
}

export default function Author({ register, watch, setValue }: AuthorProps) {
  const [selected, setSelected] = useState('myself');
  const authorValue = watch('author');

  const handleRadioChange = (value: string) => {
    setSelected(value);
    if (value === 'myself') {
      setValue('author', '본인');
    } else if (value === 'unknown') {
      setValue('author', '알 수 없음');
    } else {
      setValue('author', '');
    }
  };

  useEffect(() => {
    if (authorValue === '본인') {
      setSelected('myself');
    } else if (authorValue === '알 수 없음') {
      setSelected('unknown');
    } else {
      setSelected('custom');
    }
  }, []);

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
        <TextArea 
          size={'source'} 
          maxLength={20} 
          value={authorValue}
          {...register('author', { required: true })}
          onChange={(e) => setValue('author', e.target.value)}
        />
      </div>
    </div>
  );
}
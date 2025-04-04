'use client';

import Input from '@/components/ui/Field/Input';
import { RadioGroup } from '../ui/radio/RadioGroup';
import { RadioItem } from '../ui/radio/RadioItem';
import { AuthorProps } from '@/components/addEditForm/types';
import { useGetUser } from '@/apis/user/queries';

export default function Author({ register, watch, setValue, errors, trigger }: AuthorProps) {
  const authorType = watch('authorType');
  const { data: user } = useGetUser();
  const userNickname = user?.nickname || '';

  const getRadioValue = (authorType: string) => {
    if (authorType === 'myself') return 'myself';
    else if (authorType === 'unknown') return 'unknown';
    return 'custom';
  };

  const handleRadioChange = (value: string) => {
    if (value === 'myself') {
      setValue('authorType', 'myself');
      setValue('author', userNickname);
    } else if (value === 'unknown') {
      setValue('authorType', 'unknown');
      setValue('author', '알 수 없음');
    } else {
      setValue('authorType', 'direct');
      setValue('author', '');
    }
  };

  return (
    <div className='flex h-29 w-full flex-col gap-2 md:h-29.5 xl:h-42.75 xl:gap-6'>
      <div className={`flex h-6.5 w-9.5 items-center justify-between md:h-7 md:w-10.25 xl:h-8.75 xl:w-13.25`}>
        <p className='text-md font-semibold md:text-lg xl:text-xl'>저자</p>
        <p className='flex h-3 translate-y-[2px] items-center justify-center text-lg font-medium text-[rgba(255,101,119,1)] xl:translate-y-[3px] xl:text-2xl'>*</p>
      </div>

      <div className='flex h-20.5 w-full flex-col gap-3 xl:h-28 xl:gap-4'>
        <RadioGroup className='flex h-6.5 w-full xl:h-8' value={getRadioValue(authorType)} onValueChange={handleRadioChange} defaultValue='custom'>
          <div className='cursor-pointer'>
            <RadioItem radioSize='sm' value='custom' id='custom' label='직접 입력' />
          </div>
          <div className='cursor-pointer'>
            <RadioItem radioSize='sm' value='unknown' id='unknown' label='알 수 없음' />
          </div>
          <div className='cursor-pointer'>
            <RadioItem radioSize='sm' value='myself' id='myself' label='본인' />
          </div>
        </RadioGroup>
        <Input
          className='h-11 w-full xl:h-16'
          maxLength={20}
          disabled={authorType !== 'direct'}
          {...register('author', { required: authorType === 'direct' ? '저자 이름을 입력해주세요' : false, onBlur: () => authorType === 'direct' && trigger('author') })}
          placeholder={authorType === 'direct' ? '저자 이름 입력' : authorType === 'unknown' ? '알 수 없음' : '본인'}
          error={errors.author?.message}
          variant='outlined'
        />
      </div>
    </div>
  );
}

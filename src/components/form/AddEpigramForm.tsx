'use client';

import Button from '@/components/ui/buttons';
import Input from '@/components/ui/Field/Input';
import MainHeader from '@/components/ui/header/MainHeader';
import { RadioGroup } from '@/components/ui/radio/RadioGroup';
import { RadioItem } from '@/components/ui/radio/RadioItem';
import TextArea from '@/components/ui/textarea';
import { Pretendard } from '@/fonts';
import { MakeEpigramFormSchema } from '@/apis/auth/schemas';
import { MakeEpigramForm } from '@/apis/auth/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export default function AddEpigramForm() {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MakeEpigramForm>({
    resolver: zodResolver(MakeEpigramFormSchema),
    defaultValues: {
      authorType: 'direct',
    },
    mode: 'onBlur',
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showAll, setShowAll] = useState(false); // 태그 모두 보기 토글 상태

  const addTag = () => {
    if (tagInput && tagInput.length <= 10 && tagInput.length > 0) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<MakeEpigramForm> = (data) => {
    const formData = {
      ...data,
      tags,
    };
    console.log(formData);
    // TODO: API 호출
  };

  const authorType = watch('authorType');
  const content = watch('content', '');

  const handleRadioChange = (value: string) => {
    const typedValue = value as 'direct' | 'unknown' | 'self';
    setValue('authorType', typedValue, { shouldValidate: true });
  };

  return (
    <div className='flex flex-col'>
      <MainHeader />
      <div className='flex-grow py-6 md:py-8 lg:py-14'>
        <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-[312px] pt-10 md:pt-12 lg:w-[640px] lg:pt-14'>
          <div className={`${Pretendard.className} h-6 w-full text-lg font-semibold md:h-8 md:text-xl lg:h-8 lg:text-2xl`}>에피그램 만들기</div>
          <div className='mt-6 h-auto md:mt-8 lg:mt-10'>
            <label className={`${Pretendard.className} text-md font-semibold md:text-lg lg:text-xl`}>내용</label>
            <TextArea
              variant='limit500'
              size='responsive'
              fontSize='responsive'
              border='blue-border'
              placeholder='500자 이내로 입력해주세요.'
              {...register('content', {
                required: '내용을 입력해주세요',
                maxLength: { value: 500, message: '500자를 초과할 수 없습니다' },
              })}
              className='mt-2 lg:mt-6'
            />
            {errors.content && <p className='text-md mt-1 text-red-500 lg:text-lg'>{errors.content.message}</p>}
          </div>
          <div className='mt-10 xl:mt-14'>
            <label className={`${Pretendard.className} text-md font-semibold md:text-lg lg:text-xl`}>저자</label>
            <RadioGroup defaultValue={authorType} onValueChange={handleRadioChange} className='mt-2 lg:mt-6'>
              <RadioItem value='direct' id='direct' label='직접 입력' radioSize='sm' />
              <RadioItem value='unknown' id='unknown' label='알 수 없음' radioSize='sm' />
              <RadioItem value='self' id='self' label='본인' radioSize='sm' />
            </RadioGroup>
            {authorType === 'direct' && (
              <Input
                placeholder='저자 이름 입력'
                {...register('authorName', { required: authorType === 'direct' ? '저자 이름을 입력해주세요' : false })}
                error={errors.authorName?.message}
                className='mt-3 text-lg lg:mt-4 lg:text-xl'
              />
            )}
          </div>
          <div className='mt-10 lg:mt-14'>
            <label className={`${Pretendard.className} text-md font-semibold md:text-lg lg:text-xl`}>출처</label>
            <Input placeholder='출처 제목 입력' {...register('sourceTitle')} className='mt-2 text-lg lg:mt-6 lg:text-xl' />
            <Input placeholder='URL (ex. https://www.website.com/)' {...register('sourceUrl')} error={errors.sourceUrl?.message} className='mt-2 text-lg lg:mt-4 lg:text-xl' />
          </div>

          <div className='mt-10 lg:mt-14'>
            <label className={`${Pretendard.className} text-md font-semibold md:text-lg lg:text-xl`}>태그</label>
            <div className='mt-2 flex lg:mt-6'>
              <div className='w-3/4 lg:w-4/5'>
                <Input placeholder='입력하여 태그 작성 (최대 10자)' value={tagInput} onChange={(e) => setTagInput(e.target.value)} className='text-lg lg:text-xl' />
              </div>
              <Button type='button' variant='default' onClick={addTag} disabled={!tagInput || tagInput.length > 10} className='ml-2 w-1/4 text-sm whitespace-nowrap lg:w-1/5 lg:text-xl'>
                추가
              </Button>
            </div>

            {tagInput.length > 10 && <p className='text-md mt-1 text-red-500 lg:text-lg'>태그는 10자를 초과할 수 없습니다</p>}

            {tags.length >= 3 && <p className='text-md mt-1 text-amber-500 lg:text-lg'>태그는 최대 3개까지 추가할 수 있습니다</p>}

            {tags.length > 0 && (
              <div className='mt-2 flex flex-wrap gap-2 lg:mt-3'>
                {(showAll ? tags : tags.slice(0, 2)).map((tag, index) => (
                  <div key={index} className='flex items-center rounded-full bg-blue-100 px-3 py-1'>
                    {tag}
                    <button type='button' onClick={() => removeTag(index)} className='ml-1 text-blue-500 lg:ml-2'>
                      ×
                    </button>
                  </div>
                ))}
                {!showAll && tags.length > 2 && (
                  <button className='text-blue-500 hover:underline' onClick={() => setShowAll(true)}>
                    +{tags.length - 2}개 더보기
                  </button>
                )}
                {showAll && tags.length > 2 && (
                  <button className='text-blue-500 hover:underline' onClick={() => setShowAll(false)}>
                    닫기
                  </button>
                )}
              </div>
            )}
          </div>
          <div className='mt-6 mb-7 lg:mb-14 xl:mt-10'>
            <Button type='submit' variant='default' className='w-full' disabled={content.length > 500 || content.length < 1 || (authorType === 'direct' && !watch('authorName'))}>
              작성 완료
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useForm } from 'react-hook-form';
import Content from './Content';
import EpigramFormLayout from './EpigramFormLayout';
import { MakeEpigramForm } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { MakeEpigramFormSchema } from './schemas';
import Author from './Author';
import Input from '../ui/Field/Input';
import TagInput from './Tags';
import Button from '../ui/buttons';
import { useGetEpigram } from '@/apis/epigram/queries';
import { useEffect } from 'react';

export default function AddEpigramForm({ id }: { id: number }) {
  const { data } = useGetEpigram(id);

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<MakeEpigramForm>({
    resolver: zodResolver(MakeEpigramFormSchema),
    defaultValues: {
      authorType: 'direct',
    },
    mode: 'onBlur',
  });


  useEffect(() => {
    if (data) {
      setValue('content', data.content || '');
      setValue('authorName', data.author || '');
      setValue('sourceTitle', data.referenceTitle || '');
      setValue('sourceUrl', data.referenceUrl || '');
      setValue('tag', data.tags?.map((tag) => tag.name) || []);
    }
  }, [data, setValue]);

  const handleTagChange = (newTag: string[]) => {
    setValue('tag', newTag, { shouldValidate: true });
  };

  const onSubmit = (data: MakeEpigramForm) => {
    console.log(data);
    console.log('수정할 ID:', id);
    console.log('폼 데이터:', data?.content);
  };

  return (
    <>
      <EpigramFormLayout onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-lg font-bold md:text-xl lg:text-2xl'>에피그램 수정</h1>
        <div>
          <Content register={register} errors={errors} trigger={trigger} />
        </div>
        <div className='pt-10 lg:pt-14'>
          <Author register={register} watch={watch} setValue={setValue} errors={errors} trigger={trigger} />
        </div>
        <div className='flex flex-col gap-4 pt-10 lg:pt-14'>
          <Input label='출처' {...register('sourceTitle')} error={errors.sourceTitle?.message} placeholder='출처 제목 입력' variant='outlined' />
          <Input {...register('sourceUrl')} error={errors.sourceUrl?.message} placeholder='URL (ex. https://www.website.com)' variant='outlined' />
        </div>
        <div className='pt-10 lg:pt-14'>
          <TagInput value={watch('tag')} onChange={handleTagChange} error={errors.tag?.message} />
        </div>
        <div className='pt-10 md:pt-6 lg:pt-6'>
          <Button type='submit' variant='default' className='w-full' disabled={!watch('content') || watch('content').length > 500 || (watch('authorType') === 'direct' && !watch('authorName'))}>
            수정 완료
          </Button>
        </div>
      </EpigramFormLayout>
    </>
  );
}

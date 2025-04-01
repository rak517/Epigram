'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
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
import { useEffect, useState } from 'react';
import { useModalStore } from '@/stores/ModalStore';
import { usePatchEpigram } from '@/apis/epigram/queries';

export default function EditEpigramForm({ id }: { id: number }) {
  const { data } = useGetEpigram(id);
  const { mutate: patchEpigram } = usePatchEpigram();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { openModal } = useModalStore();
  

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
      setValue('author', data.author || '');
      setValue('referenceTitle', data.referenceTitle || '');
      setValue('referenceUrl', data.referenceUrl || '');
      setValue('tags', data.tags?.map((tag) => tag.name) || []);
    }
  }, [data, setValue]);

  const handleTagChange = (newTag: string[]) => {
    setValue('tags', newTag, { shouldValidate: true });
  };

  const onSubmit = async (data: MakeEpigramForm) => {
    const epigramForm = {
      content: data.content,
      author: data.author || '',
      ...(data.referenceTitle && { referenceTitle: data.referenceTitle }),
      ...(data.referenceUrl && { referenceUrl: data.referenceUrl }),
      tags: data.tags,
    };

    setIsSubmitting(true);
    patchEpigram(
      { epigramId: id, epigram:  epigramForm },
      {
        onSuccess: () => {
          openModal({
            type: 'alert',
            title: '에피그램 수정 성공',
            callback: () => router.push(`/epigrams/${id}`),
          });
        },
        onError: (error) => {
          openModal({
            type: 'alert',
            title: '에피그램 수정 실패',
            callback: () => console.error('에러 메시지:', error),
          });
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      },
    );
  };

  return (
    <>
      <EpigramFormLayout className='flex flex-col gap-6 md:gap-8 lg:gap-10' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-lg font-bold md:text-xl lg:text-2xl'>에피그램 수정</h1>
        <div className='flex flex-col gap-6 md:gap-8 lg:gap-10'>
          <div className='flex flex-col gap-10 md:gap-9.75 lg:gap-10'>
            <Content register={register} errors={errors} trigger={trigger} />

            <Author register={register} watch={watch} setValue={setValue} errors={errors} trigger={trigger} />

            <div className='flex flex-col gap-4'>
              <Input label='출처' {...register('referenceTitle')} error={errors.referenceTitle?.message} placeholder='출처 제목 입력' variant='outlined' />
              <Input {...register('referenceUrl')} error={errors.referenceUrl?.message} placeholder='URL (ex. https://www.website.com)' variant='outlined' />
            </div>

            <TagInput value={watch('tags')} onChange={handleTagChange} error={errors.tags?.message} />
          </div>

          <Button
            type='submit'
            variant='default'
            className='w-full'
            disabled={!watch('content') || watch('content').length > 500 || (watch('authorType') === 'direct' && !watch('author')) || isSubmitting}
          >
            {isSubmitting ? '수정 중...' : '수정 완료'}
          </Button>
        </div>
      </EpigramFormLayout>
    </>
  );
}

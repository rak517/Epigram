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
import { usePostEpigram } from '@/apis/epigram/queries';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/stores/ModalStore';

export default function AddEpigramForm() {
  const router = useRouter();
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

  const { mutateAsync: postEpigram } = usePostEpigram();

  const handleTagChange = (newTag: string[]) => {
    setValue('tags', newTag, { shouldValidate: true });
  };

  const onSubmit = async (data: MakeEpigramForm) => {
    const epigramForm = {
      content: data.content,
      author: data.author || '',
      referenceTitle: data.referenceTitle,
      referenceUrl: data.referenceUrl,
      tags: data.tags,
    };

    try {
      const response = await postEpigram(epigramForm);
      if (response?.id) {
        router.push(`/epigrams/${response.id}`);
      }
    } catch (error) {
      openModal({
        type: 'alert',
        title: '에피그램 생성 실패',
        callback: () => console.error('에러 메시지:', error),
      });
    }
  };

  return (
    <>
      <EpigramFormLayout className='flex flex-col gap-6 md:gap-8 lg:gap-10' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-lg font-bold md:text-xl lg:text-2xl'>에피그램 만들기</h1>
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

          <Button type='submit' variant='default' className='w-full' disabled={!watch('content') || watch('content').length > 500 || (watch('authorType') === 'direct' && !watch('author'))}>
            작성 완료
          </Button>
        </div>
      </EpigramFormLayout>
    </>
  );
}

'use client';

import { useForm } from 'react-hook-form';
import Button from '@/components/ui/buttons/index';
import Content from '@/components/edit/Content';
import Author from '@/components/edit/Author';
import Source from '@/components/edit/Source';
import Tags from '@/components/ui/Field/tagsInput';

type FormData = {
  content: string;
  author: string;
  source: string;
  tags: string[];
};

interface EpigramEditFormProps {
  initialData: {
    content: string;
    author: string;
    source: string;
    tags: string[];
  };
}

export default function EpigramEditForm({ initialData }: EpigramEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
    control,
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      content: initialData.content,
      author: initialData.author,
      source: initialData.source,
      tags: initialData.tags,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('제출된 데이터:', data); //todo 디버깅 용입니다.
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex h-183.75 flex-col gap-6 md:gap-9.75 xl:gap-10'>
      <Content register={register} errors={errors} trigger={trigger} />
      <Author register={register} watch={watch} setValue={setValue} />
      <Source register={register} />
      <Tags control={control} errors={errors} />
      <Button type='submit' className='w-full'>
        수정 완료
      </Button>
    </form>
  );
}

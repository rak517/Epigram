'use client';

import { Control, Controller, FieldErrors } from 'react-hook-form';
import TagInput from '@/components/edit/Tags';

type FormData = {
  content: string;
  author: string;
  source: string;
  tags: string[];
};

interface TagsProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export default function Tags({ control, errors }: TagsProps) {
  return <Controller name='tags' control={control} defaultValue={[]} render={({ field }) => <TagInput value={field.value || []} onChange={field.onChange} error={errors.tags?.message} />} />;
}

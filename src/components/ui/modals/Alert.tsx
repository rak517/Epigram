'use client';

import { AlramMessage } from './types';
import Button from '@/components/ui/buttons';
import { useState } from 'react';

export default function Alert({ title, description, okMessage = '확인', onClose, callback }: AlramMessage) {
  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = async () => {
    setIsLoading(true);
    await callback?.();
    setIsLoading(false);
    onClose();
  };
  return (
    <>
      <div className='flex flex-col items-center gap-4'>
        <h2 className='text-black-700 text-lg font-semibold md:text-xl lg:text-2xl'>{title}</h2>
        <p className='text-md lg:text-2lg text-gray-400 md:text-lg'>{description}</p>
      </div>
      <div className='mt-4 flex w-full gap-4'>
        <Button className='flex-1' onClick={onConfirm} disabled={isLoading}>
          {okMessage}
        </Button>
      </div>
    </>
  );
}

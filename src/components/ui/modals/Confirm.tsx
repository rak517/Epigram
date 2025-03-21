'use client';

import { AlramMessage } from './types';
import Image from 'next/image';
import ConfirmIcon from '@/assets/icons/Confirm_Icon.svg';
import Button from '@/components/ui/buttons';
import { useState } from 'react';

export default function Confirm({ title, description, cancelMessage = '취소', okMessage = '확인', onClose, callback }: AlramMessage) {
  const [isLoading, setIsLoading] = useState(false);

  const onCancel = () => {
    onClose();
  };

  const onConfirm = async () => {
    setIsLoading(true);
    await callback?.();
    setIsLoading(false);
    onClose();
  };
  return (
    <>
      <div className='flex flex-col items-center gap-4'>
        <Image src={ConfirmIcon} alt='확인 모달 아이콘' width={56} height={56} className='size-11 lg:size-14' />
        <h2 className='text-black-700 text-lg font-semibold md:text-xl lg:text-2xl'>{title}</h2>
        <p className='text-md lg:text-2lg text-gray-400 md:text-lg'>{description}</p>
      </div>
      <div className='mt-4 flex w-full gap-4'>
        <Button className='text-black-700 flex-1 bg-blue-200 hover:bg-blue-300 active:bg-blue-400' onClick={onCancel}>
          {cancelMessage}
        </Button>
        <Button className='flex-1 bg-blue-700 hover:bg-blue-800 active:bg-blue-900' onClick={onConfirm} disabled={isLoading}>
          {okMessage}
        </Button>
      </div>
    </>
  );
}

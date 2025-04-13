'use client';

import { MypageContext } from '@/context/MypageProvider';
import LogoutButton from '../auth/LogoutButton';
import Avatar from '../ui/avatars';
import { useContext, useRef } from 'react';
import { usePostImage } from '@/apis/image/queries';

export default function UserProfileLayout() {
  const { user } = useContext(MypageContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: upLoadImage } = usePostImage();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    upLoadImage(formData);
  };

  return (
    <div className='absolute top-0 left-1/2 flex -translate-x-1/2 -translate-y-[40px] flex-col items-center justify-center gap-4 lg:-translate-y-[60px] lg:gap-6'>
      <Avatar src={user.image} alt='유저이미지' className='size-20 cursor-pointer border-2 border-blue-300 lg:size-[120px]' onClick={handleAvatarClick} priority></Avatar>
      <input type='file' className='hidden' onChange={handleChangeImage} accept='image/*' ref={fileInputRef} />
      <p className='text-black-950 text-lg font-medium lg:text-2xl'>{user.nickname}</p>
      <LogoutButton className='h-9 w-[77px] px-3.5 py-1.5 text-[14px] font-normal whitespace-nowrap lg:h-12 lg:w-[100px] lg:px-4 lg:py-2 lg:text-xl lg:font-medium'></LogoutButton>
    </div>
  );
}

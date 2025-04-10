'use client';

import RoundedButton from '../ui/buttons/roundedButton';
import like from '@/assets/icons/like.svg';
import like_outlined from '@/assets/icons/like_outlined.svg';
import external from '@/assets/icons/external-link.svg';
import share from '@/assets/icons/share.svg';
import Image from 'next/image';
import { useDeleteEpigramFavorite, useGetEpigram, usePostEpigramFavorite } from '@/apis/epigram/queries';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/stores/ModalStore';
import { isAxiosError } from 'axios';
import { getErrorMessage } from '@/utils/network/getErrorMessage';
import { useToast } from '@/utils/toast/ToastContext';
import { copyCurrentUrl } from '@/utils/copyCurrentUrl';
import { useEffect, useState } from 'react';

interface EpigramContentProps {
  epigramId: number;
  initialLikeCount: number;
  initialIsLiked: boolean;
  referenceUrl: string | null;
}

export default function EpigramContent({ epigramId, initialLikeCount, initialIsLiked, referenceUrl }: EpigramContentProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const router = useRouter();
  const { openModal } = useModalStore();
  const { showToast } = useToast();

  const addFavoriteMutation = usePostEpigramFavorite();
  const deleteFavoriteMutation = useDeleteEpigramFavorite();

  const { data } = useGetEpigram(epigramId);

  // 좋아요를 누르고 새로고침하고 다시 좋아요를 누르면 에러발생 (서버와 클라이언트 상태를 동기화하기 위해 작성)
  useEffect(() => {
    const verifyLikeStatus = async () => {
      try {
        if (data && data.isLiked !== undefined) {
          const serverIsLiked = data?.isLiked;

          if (serverIsLiked !== isLiked) {
            setIsLiked(serverIsLiked);
            setLikeCount(data?.likeCount);
          }
        }
      } catch (error) {
        console.error('좋아요 상태 오류', error);
      }
    };
    verifyLikeStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [epigramId]);

  const handleCopyUrl = () => {
    copyCurrentUrl(
      (msg: string) => showToast(msg, 'success', 'URL 복사'),
      (msg: string) => showToast(msg, 'error', '복사 실패'),
    );
  };

  const handleToggleLike = async () => {
    try {
      if (!isLiked) {
        console.log('좋아요를 안누른상태에요');
        await addFavoriteMutation.mutateAsync(epigramId);
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      } else {
        console.log('좋아요를 누른상태에요');
        await deleteFavoriteMutation.mutateAsync(epigramId);
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      }
    } catch (err) {
      let errorMessage = getErrorMessage(err);
      let callback = () => {};

      console.error('좋아요 처리 오류:', err);

      if (isAxiosError(err) && err.response?.data?.message === '이미 좋아요를 눌렀습니다.') {
        setIsLiked(true);
        return;
      }

      //세션 만료 처리
      if (isAxiosError(err) && err.status === 401) {
        errorMessage = '세션이 만료되었습니다.';
        callback = () => {
          router.push('/login');
        };
      }
      openModal({
        type: 'alert',
        title: '오류',
        description: errorMessage,
        okMessage: '확인',
        callback,
      });
    }
  };

  return (
    <div className='px-auto flex gap-4 pt-9'>
      {isLiked ? (
        <RoundedButton variant='secondary' onClick={handleToggleLike}>
          <div className='flex items-center justify-center'>
            <div className='hidden md:block'>
              <Image src={like} alt='좋아요 따봉 이미지' width={36} height={36} priority />
            </div>
            <div className='block md:hidden'>
              <Image src={like} alt='좋아요 따봉 이미지' width={20} height={20} priority />
            </div>
            <div className='text-md min-w-[65px] text-center lg:text-xl'>{likeCount}</div>
          </div>
        </RoundedButton>
      ) : (
        <RoundedButton variant='secondary' onClick={handleToggleLike}>
          <div className='flex items-center justify-center'>
            <div className='hidden h-9 w-9 md:block'>
              <Image src={like_outlined} alt='좋아요 따봉 이미지' className='mt-1.5 ml-1' priority />
            </div>
            <div className='block md:hidden md:h-5 md:w-5'>
              <Image src={like_outlined} alt='좋아요 따봉 이미지' priority />
            </div>
            <div className='text-md min-w-[65px] text-center lg:text-xl'>{likeCount}</div>
          </div>
        </RoundedButton>
      )}

      <RoundedButton variant='outline' onClick={handleCopyUrl}>
        <div className='flex items-center justify-center gap-2'>
          <div className='text-md lg:text-xl'>URL 복사</div>
          <div className='hidden md:block'>
            <Image src={share} alt='URL 복사 이미지' width={25} height={25} />
          </div>
          <div className='hidden sm:block md:hidden'>
            <Image src={share} alt='URL 복사 이미지' width={15} height={15} />
          </div>
        </div>
      </RoundedButton>
      {referenceUrl && (
        <RoundedButton onClick={() => referenceUrl && window.open(referenceUrl, '_blank')}>
          <div className='flex items-center justify-center'>
            <div className='text-md lg:text-xl'>왕도로 가는 길</div>
            <div className='hidden md:block'>
              <Image src={external} alt='외부 이동 이미지' width={36} height={36} />
            </div>
            <div className='hidden sm:block md:hidden'>
              <Image src={external} alt='외부 이동 이미지' width={20} height={20} />
            </div>
          </div>
        </RoundedButton>
      )}
    </div>
  );
}

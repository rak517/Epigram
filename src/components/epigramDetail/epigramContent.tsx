'use client';

import RoundedButton from '../ui/buttons/roundedButton';
import TextCard from '../ui/textcard';
import like from '@/assets/icons/like.svg';
import like_outlined from '@/assets/icons/like_outlined.svg';
import external from '@/assets/icons/external-link.svg';
import share from '@/assets/icons/share.svg';
import Image from 'next/image';
import { useDeleteEpigram, useDeleteEpigramFavorite, useGetEpigram, usePostEpigramFavorite } from '@/apis/epigram/queries';
import { useParams, useRouter } from 'next/navigation';
import { useModalStore } from '@/stores/ModalStore';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import axios, { isAxiosError } from 'axios';
import { useGetUser } from '@/apis/user/queries';
import { getErrorMessage } from '@/utils/network/getErrorMessage';

//TODO: 데이터 삭제시 404에러 해결

export default function EpigramContent() {
  const router = useRouter();
  const params = useParams();
  const { openModal } = useModalStore();

  const isDeleted = useRef(false);

  const epigramId = params?.id ? Number(params.id) : undefined;

  const { data, isError, isLoading, error } = useGetEpigram(isDeleted.current ? undefined : epigramId);

  const { data: user } = useGetUser();

  const deleteEpigramMutation = useDeleteEpigram();

  const addFavoriteMutation = usePostEpigramFavorite();

  const deleteFavoriteMutation = useDeleteEpigramFavorite();

  const hasSourceUrl = data?.referenceUrl;

  const showDropdown = user?.id === data?.writerId;

  const queryClient = useQueryClient();

  const [localIsLiked, setLocalIsLiked] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(0);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setLocalIsLiked(data?.isLiked || false);
      setLocalLikeCount(data?.likeCount || 0);
    }
  }, [data]);

  if (isDeleted.current) {
    return null;
  }

  if (isLoading) {
    return (
      <div className='flex w-full flex-col items-center justify-center pt-18 pb-1'>
        <div className='h-[164px] w-[312px] rounded-lg bg-gray-200 md:h-[182px] md:w-[384px] lg:h-[236px] lg:w-[640px]'></div>
        <div className='px-auto flex w-full max-w-[640px] justify-center gap-4 pt-9'>
          <div className='h-10 w-32 rounded-full bg-gray-200'></div>
          <div className='h-10 w-36 rounded-full bg-gray-200'></div>
          <div className='h-10 w-40 rounded-full bg-gray-200'></div>
        </div>
      </div>
    );
  }

  if (isError) {
    throw error;
  }

  const handleCopyUrl = () => {
    const currentURL = window.location.href;

    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        alert('URL이 클립보드에 복사되었습니다');
      })
      .catch((err) => {
        console.error(err);
        alert('URL 복사에 실패했습니다. 직접 주소창의 URL을 복사해주세요.');
      });
  };

  const handleTagClick = (tagName: string) => {
    router.push(`/search?keyword=${encodeURIComponent(tagName)}`);
  };

  const handleEdit = () => {
    router.push(`/epigrams/${data?.id}/edit`);
  };

  const handleDeleteClick = () => {
    openModal({
      type: 'confirm',
      title: '에피그램 삭제',
      description: '정말로 이 에피그램을 삭제하시겠습니까?',
      okMessage: '삭제',
      cancelMessage: '취소',
      callback: () => {
        handleDelete();
      },
    });
  };

  const handleDelete = async () => {
    if (data) {
      try {
        await deleteEpigramMutation.mutateAsync(data.id);

        isDeleted.current = true;

        openModal({
          type: 'alert',
          title: '알림',
          description: '에피그램이 삭제되었습니다.',
          okMessage: '확인',
          callback: () => {
            router.push('/epigrams');
          },
        });
        queryClient.removeQueries({ queryKey: ['epigram', epigramId] });
      } catch (err) {
        console.error('삭제중 오류 발생', err);
        openModal({
          type: 'alert',
          title: '오류',
          description: '삭제중 오류가 발생했습니다.',
          okMessage: '확인',
        });
      }
    }
  };

  const handleToggleLike = async () => {
    if (!data || isLikeLoading) return;

    setIsLikeLoading(true);

    const newIsLiked = !localIsLiked;
    setLocalIsLiked(newIsLiked);
    setLocalLikeCount((prev) => (newIsLiked ? prev + 1 : prev - 1));

    try {
      if (newIsLiked) {
        try {
          await addFavoriteMutation.mutateAsync(data.id);
        } catch (addError) {
          if (axios.isAxiosError(addError) && addError.response?.status === 400 && addError.response?.data?.message === '이미 좋아요를 눌렀습니다.') {
            console.log('이미 좋아요 상태입니다');
          } else {
            throw addError;
          }
        } finally {
          setIsLikeLoading(false);
        }
      } else {
        try {
          await deleteFavoriteMutation.mutateAsync(data.id);
        } catch (deleteError) {
          if (axios.isAxiosError(deleteError) && deleteError.response?.status === 400 && deleteError.response?.data?.message === '좋아요를 누르지 않았습니다.') {
            console.log('이미 좋아요가 취소된 상태입니다');
          } else {
            throw deleteError;
          }
        } finally {
          setIsLikeLoading(false);
        }
      }

      await queryClient.invalidateQueries({ queryKey: ['epigram', epigramId] });
    } catch (err) {
      setLocalIsLiked(!newIsLiked);
      setLocalLikeCount((prev) => (!newIsLiked ? prev + 1 : prev - 1));
      let errorMessage = getErrorMessage(err);
      let callback = () => {};

      console.error('좋아요 처리 오류:', err);
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
    <div className='flex w-full flex-col items-center justify-center bg-[linear-gradient(white_90%,#f2f2f2)] bg-[length:100%_20px] bg-repeat pt-32 pb-1 shadow-[0px_3px_12px_0px_rgba(0,0,0,0.04)]'>
      <TextCard
        variant='variableHeight'
        tagPosition='topLeft'
        hasBackground={false}
        isDropdown={showDropdown}
        hasBorder={false}
        tagClassName='text-base lg:text-xl pl-4'
        authorClassName='text-base md:text-xl lg:text-2xl'
        cardContent={data?.content}
        author={data?.author}
        tags={data?.tags}
        onTagClick={handleTagClick}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        className='h-[164px] w-[312px] text-2xl md:h-[182px] md:w-[384px] lg:h-[236px] lg:w-[640px] lg:text-3xl'
      />
      <div className='px-auto flex gap-4 pt-9'>
        {localIsLiked ? (
          <RoundedButton variant='secondary' onClick={handleToggleLike}>
            <div className='flex items-center justify-center'>
              <div className='hidden md:block'>
                <Image src={like} alt='좋아요 따봉 이미지' width={36} height={36} />
              </div>
              <div className='block md:hidden'>
                <Image src={like} alt='좋아요 따봉 이미지' width={20} height={20} />
              </div>
              <div className='text-md min-w-[65px] text-center lg:text-xl'>{localLikeCount}</div>
            </div>
          </RoundedButton>
        ) : (
          <RoundedButton variant='secondary' onClick={handleToggleLike}>
            <div className='flex items-center justify-center'>
              <div className='hidden h-9 w-9 md:block'>
                <Image src={like_outlined} alt='좋아요 따봉 이미지' className='mt-1.5 ml-1' />
              </div>
              <div className='block md:hidden md:h-5 md:w-5'>
                <Image src={like_outlined} alt='좋아요 따봉 이미지' />
              </div>
              <div className='text-md min-w-[65px] text-center lg:text-xl'>{localLikeCount}</div>
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
        {hasSourceUrl && (
          <RoundedButton onClick={() => data.referenceUrl && window.open(data.referenceUrl, '_blank')}>
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
      <div className='after:zigzag relative h-4 w-full'></div>
    </div>
  );
}

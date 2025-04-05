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
import { isAxiosError } from 'axios';
import { useGetUser } from '@/apis/user/queries';
import { getErrorMessage } from '@/utils/network/getErrorMessage';
import { useToast } from '@/utils/toast/ToastContext';
import { copyCurrentUrl } from '@/utils/copyCurrentUrl';

export default function EpigramContent() {
  const router = useRouter();
  const params = useParams();
  const { openModal } = useModalStore();

  const epigramId = params?.id ? Number(params.id) : undefined;

  const { data, isError, isLoading, error } = useGetEpigram(epigramId);

  const { data: user } = useGetUser();

  const deleteEpigramMutation = useDeleteEpigram();

  const addFavoriteMutation = usePostEpigramFavorite();

  const deleteFavoriteMutation = useDeleteEpigramFavorite();

  const hasSourceUrl = data?.referenceUrl;

  const showDropdown = user?.id === data?.writerId;

  const { showToast } = useToast();

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
    copyCurrentUrl(
      (msg: string) => showToast(msg, 'success', 'URL 복사'),
      (msg: string) => showToast(msg, 'error', '복사 실패'),
    );
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
      deleteEpigramMutation.mutate(data.id, {
        onError: () => {
          showToast('에피그램 삭제 중 오류가 발생했습니다.', 'error', '삭제 실패');
        },
      });
    }
  };

  const handleToggleLike = async () => {
    if (!data) return;

    try {
      if (!data.isLiked) {
        await addFavoriteMutation.mutateAsync(data.id);
      } else {
        await deleteFavoriteMutation.mutateAsync(data.id);
      }
    } catch (err) {
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
        {data?.isLiked ? (
          <RoundedButton variant='secondary' onClick={handleToggleLike}>
            <div className='flex items-center justify-center'>
              <div className='hidden md:block'>
                <Image src={like} alt='좋아요 따봉 이미지' width={36} height={36} />
              </div>
              <div className='block md:hidden'>
                <Image src={like} alt='좋아요 따봉 이미지' width={20} height={20} />
              </div>
              <div className='text-md min-w-[65px] text-center lg:text-xl'>{data?.likeCount}</div>
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
              <div className='text-md min-w-[65px] text-center lg:text-xl'>{data?.likeCount}</div>
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

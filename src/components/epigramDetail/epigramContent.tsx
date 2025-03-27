'use client';

import RoundedButton from '../ui/buttons/roundedButton';
import TextCard from '../ui/textcard';
import like from '@/assets/icons/like.svg';
import external from '@/assets/icons/external-link.svg';
import share from '@/assets/icons/share.svg';
import Image from 'next/image';
import { useDeleteEpigram, useDeleteEpigramFavorite, useGetTodayEpigram, usePostEpigramFavorite } from '@/apis/epigram/queries';
import { useParams, useRouter } from 'next/navigation';
import { useModalStore } from '@/stores/ModalStore';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function EpigramContent() {
  const router = useRouter();
  const params = useParams();
  const { openModal } = useModalStore();

  const { data } = useGetTodayEpigram();

  const deleteEpigramMutation = useDeleteEpigram();

  const addFavoriteMutation = usePostEpigramFavorite();

  const deleteFavoriteMutation = useDeleteEpigramFavorite();

  const hasSourceUrl = data?.referenceUrl && data.referenceUrl.trim() !== '';

  const showDropdown = params?.id === data?.writerId.toString();

  const queryClient = useQueryClient();

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
    router.push(`/epigrams/${data?.writerId}/edit`);
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
        openModal({
          type: 'alert',
          title: '알림',
          description: '에피그램이 삭제되었습니다.',
          okMessage: '확인',
          callback: () => {
            window.location.reload();
          },
        });
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
    if (!data) return;

    try {
      try {
        console.log('좋아요 추가 시도');
        await addFavoriteMutation.mutateAsync(data.id);

        await queryClient.invalidateQueries({ queryKey: ['todayEpigram'] });
      } catch (addError: unknown) {
        if (axios.isAxiosError(addError) && addError.response?.status === 400 && addError.response?.data?.message === '이미 좋아요를 눌렀습니다.') {
          console.log('이미 좋아요가 있어 취소 시도');
          await deleteFavoriteMutation.mutateAsync(data.id);

          await queryClient.invalidateQueries({ queryKey: ['todayEpigram'] });
        } else {
          throw addError;
        }
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error('AxiosError 발생:', err.response?.data?.message || err.message);
      } else if (err instanceof Error) {
        console.error('일반 오류 발생:', err.message);
      } else {
        console.error('알 수 없는 오류 발생', err);
      }

      openModal({
        type: 'alert',
        title: '오류',
        description: '좋아요 처리 중 오류가 발생했습니다.',
        okMessage: '확인',
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
        <RoundedButton variant='secondary' onClick={handleToggleLike}>
          <div className='flex items-center justify-center'>
            <div className='hidden md:block'>
              <Image src={like} alt='좋아요 따봉 이미지' width={36} height={36} />
            </div>
            <div className='block md:hidden'>
              <Image src={like} alt='좋아요 따봉 이미지' width={20} height={20} />
            </div>
            <div className='text-md min-w-[75px] text-center lg:text-xl'>{data?.likeCount}</div>
          </div>
        </RoundedButton>
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

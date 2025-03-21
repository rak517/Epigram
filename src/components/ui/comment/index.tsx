import React from 'react';
import Avatar from '@/components/ui/avatars';

interface CommentProps {
  isOwnComment: boolean;
  nickname: string;
  commentTime: string | null;
  content: string;
  profileImage: string | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function Comment({ isOwnComment, nickname, commentTime, content, profileImage, onEdit, onDelete, ...props }: CommentProps) {
  return (
    <div className='bg-background-100 border-line-200 flex max-w-[640px] border-t px-6 py-4 transition-all duration-300 ease-in-out hover:shadow-lg sm:py-4 md:py-6 lg:py-8' {...props}>
      {/* 왼쪽: 이미지 박스 */}
      <div className='mr-4 h-12 w-12 overflow-hidden rounded-full'>
        <Avatar src={profileImage} alt={`${nickname}님의 프로필 이미지`} size='default' />
      </div>

      {/* 오른쪽: 텍스트 박스 */}
      <div className='flex flex-1 flex-col'>
        {/* 상단 박스: 닉네임, 댓글 시간, 수정/삭제 버튼 */}
        <div className='mb-2 flex items-center justify-between'>
          <div className='flex items-center'>
            <span className='text-black-300 md:text-md mr-2 text-xs sm:text-xs lg:text-lg'>{nickname}</span>
            <span className='text-black-300 md:text-md text-xs sm:text-xs lg:text-lg'>{commentTime}</span>
          </div>

          {isOwnComment && (
            <div className='flex space-x-4'>
              <button className='text-black-600 md:text-md cursor-pointer text-xs underline sm:text-xs lg:text-lg' onClick={onEdit}>
                수정
              </button>
              <button className='text-error md:text-md cursor-pointer text-xs underline sm:text-xs lg:text-lg' onClick={onDelete}>
                삭제
              </button>
            </div>
          )}
        </div>

        {/* 댓글 내용 */}
        <div className='text-black-700 text-md sm:text-md md:text-lg lg:text-xl'>{content}</div>
      </div>
    </div>
  );
}

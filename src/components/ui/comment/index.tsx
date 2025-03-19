import React from "react";
import Image from "next/image";

interface CommentProps {
  isOwnComment: boolean;
  nickname: string;
  commentTime: string;
  content: string;
  profileImage: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function Comment({
  isOwnComment,
  nickname,
  commentTime,
  content,
  profileImage,
  onEdit,
  onDelete,
  ...props
}: CommentProps) {
  return (
    <div
      className="flex max-w-[640px] bg-background-100 hover:shadow-lg transition-all duration-300 ease-in-out border-t border-line-200 py-4 sm:py-4 md:py-6 lg:py-8 px-6"
      {...props}
    >
      {/* 왼쪽: 이미지 박스 */}
      <div className="w-12 h-12 mr-4 rounded-full overflow-hidden">
        <Image
          src={profileImage}
          alt="프로필 이미지"
          width={48}
          height={48}
          className="object-cover w-full h-full"
        />

        {/* <Avatar src={profileImage} alt="프로필 이미지" size="default" /> */}
      </div>

      {/* 오른쪽: 텍스트 박스 */}
      <div className="flex-1 flex flex-col">
        {/* 상단 박스: 닉네임, 댓글 시간, 수정/삭제 버튼 */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className="mr-2 text-black-300 text-xs sm:text-xs md:text-md lg:text-lg">
              {nickname}
            </span>
            <span className="text-black-300 text-xs sm:text-xs md:text-md lg:text-lg">
              {commentTime}
            </span>
          </div>

          {isOwnComment && (
            <div className="flex space-x-4">
              <button
                className="cursor-pointer text-black-600 underline text-xs sm:text-xs md:text-md lg:text-lg"
                onClick={onEdit}
              >
                수정
              </button>
              <button
                className="cursor-pointer text-error underline text-xs sm:text-xs md:text-md lg:text-lg"
                onClick={onDelete}
              >
                삭제
              </button>
            </div>
          )}
        </div>

        {/* 댓글 내용 */}
        <div className="text-black-700 text-md sm:text-md md:text-lg lg:text-xl">
          {content}
        </div>
      </div>
    </div>
  );
}

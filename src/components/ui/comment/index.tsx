import React from "react";

interface CommentProps {
  isOwnComment: boolean;
  nickname: string;
  commentTime: string;
  content: string;
  profileImage: string;
}

export default function Comment({
  isOwnComment,
  nickname,
  commentTime,
  content,
  profileImage
}: CommentProps) {
  return (
    <div className="flex max-w-[640px] bg-[#F5F7FA] hover:shadow-lg transition-all duration-300 ease-in-out border-t border-[#CFDBEA] py-[16px] sm:py-[16px] md:py-[24px] lg:py-[35px] px-[24px]">

      {/* 왼쪽: 이미지 박스 */}
      <div className="w-12 h-12 mr-4 rounded-full overflow-hidden">
        <img
          src={profileImage}
          alt="프로필 이미지"
          className="object-cover w-full h-full"
        />
      </div>

      {/* 오른쪽: 텍스트 박스 */}
      <div className="flex-1 flex flex-col">
        {/* 상단 박스: 닉네임, 댓글 시간, 수정/삭제 버튼 */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className="mr-2 text-[var(--color-black-300)] text-xs sm:text-xs md:text-md lg:text-lg">
              {nickname}
            </span>
            <span className="text-[var(--color-black-300)] text-xs sm:text-xs md:text-md lg:text-lg">
              {commentTime}
            </span>
          </div>

          {isOwnComment && (
            <div className="flex space-x-4">
              <button className="cursor-pointer text-[var(--color-black-600)] underline text-xs sm:text-xs md:text-md lg:text-lg">
                수정
              </button>
              <button className="cursor-pointer text-[var(--color-error)] underline text-xs sm:text-xs md:text-md lg:text-lg">
                삭제
              </button>
            </div>
          )}
        </div>

        {/* 댓글 내용 */}
        <div className="text-[var(--color-black-700)] text-md sm:text-md md:text-lg lg:text-xl">
          {content}
        </div>
      </div>
    </div>
  );
}

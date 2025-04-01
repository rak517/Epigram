import Image from 'next/image';
import empty_img from '@/assets/images/empty_epigram.svg';

export default function CommentEmptyState() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 py-12'>
      <Image src={empty_img} alt='댓글 없음' width={150} height={150} />
      <p className='text-lg text-gray-500'>아직 작성된 댓글이 없습니다.</p>
      <p className='text-sm text-gray-400'>첫 댓글을 남겨보세요!</p>
    </div>
  );
}

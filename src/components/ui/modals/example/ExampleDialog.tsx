//TODO: 커스텀 모달 샘플 코드이며, 프로젝트 마무리 단계에서 삭제할 예정입니다.
import Image from 'next/image';
import ConfirmIcon from '@/assets/icons/Confirm_Icon.svg';

export default function ExampleDialog({ message }: { message: string }) {
  return (
    <div className='mb-4 flex flex-col items-center gap-4'>
      <Image src={ConfirmIcon} alt='확인 모달 아이콘' width={56} height={56} className='size-11 lg:size-14' />
      <p>{message}</p>
    </div>
  );
}

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

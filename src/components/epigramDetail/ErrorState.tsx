import RoundedButton from '../ui/buttons/roundedButton';
import { useRouter } from 'next/navigation';

export default function ErrorState() {
  const router = useRouter();

  return (
    <div className='flex h-[60vh] w-full flex-col items-center justify-center px-4'>
      <h2 className='mb-4 text-2xl font-semibold text-gray-800'>존재하지 않는 에피그램입니다</h2>
      <p className='mb-6 text-center text-gray-600'>존재하신 에피그램을 찾을 수 없습니다. 삭제되었거나 잘못된 ID일 수 있습니다.</p>
      <div className='flex gap-4'>
        <RoundedButton variant='outline' onClick={() => router.back()}>
          이전 페이지로
        </RoundedButton>
        <RoundedButton variant='outline' onClick={() => router.push('/')}>
          홈으로 돌아가기
        </RoundedButton>
      </div>
    </div>
  );
}

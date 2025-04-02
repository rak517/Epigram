import { Pretendard } from '@/fonts';
import Avatar from '../ui/avatars';

interface ProfileModalProps {
  profileImage: string;
  nickname: string;
}

export default function ProfileModal({ profileImage, nickname }: ProfileModalProps) {
  return (
    <div className='flex flex-col items-center gap-4'>
      <Avatar src={profileImage} alt={`${nickname}님의 프로필 이미지`} size='default' />
      <h2 className={`${Pretendard.className} text-xl font-semibold`}>{nickname}</h2>
    </div>
  );
}

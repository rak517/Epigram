import { useState } from 'react';
import TextArea from '../ui/textarea';
import ToggleButton from '../ui/toggleBtn';
import Button from '../ui/buttons';
import { PatchComment } from '@/apis/comment/types';

interface EditCommentModalProps {
  initialContent?: string;
  commentId: number;
  onSave: (data: { commentId: number; patchData: PatchComment }) => Promise<void>;
}

export default function EditCommentModal({ initialContent = '', commentId, onSave }: EditCommentModalProps) {
  const [content, setContent] = useState(initialContent);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSave = async () => {
    if (onSave) {
      await onSave({ commentId, patchData: { content, isPrivate } });
    }
  };

  return (
    <div className='flex w-full flex-col gap-6'>
      <h3 className='text-2lg text-black-500 font-semibold'>댓글 수정</h3>
      <div className='w-full'>
        <TextArea className='w-full resize-none' value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div className='flex w-full justify-between'>
        <ToggleButton isPublic={isPrivate} label='비공개' onToggle={(newState) => setIsPrivate(newState)} />
        <Button size='xs' onClick={handleSave}>
          저장
        </Button>
      </div>
    </div>
  );
}

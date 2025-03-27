import { useState } from 'react';
import { PatchComment } from '@/apis/comment/types';
import TextArea from '../ui/textarea';
import ToggleButton from '../ui/toggleBtn';
import Button from '../ui/buttons';

interface EditCommentModalProps {
  initialContent?: string;
  initialPrivate?: boolean;
  commentId: number;
  onSave: (data: { commentId: number; patchData: PatchComment }) => Promise<void>;
}

const MAX_LENGTH = 500;

export default function EditCommentModal({ initialContent = '', initialPrivate = false, commentId, onSave }: EditCommentModalProps) {
  const [content, setContent] = useState(initialContent);
  const [isPrivate, setIsPrivate] = useState(initialPrivate);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSaveDisabled = (initialContent === content && initialPrivate === isPrivate) || isSubmitting || content.trim().length === 0;

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await onSave({ commentId, patchData: { content, isPrivate } });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex w-full flex-col gap-6'>
      <h3 className='text-2lg text-black-500 font-semibold'>댓글 수정</h3>
      <div className='w-full'>
        <TextArea className='w-full resize-none' value={content} onChange={(e) => setContent(e.target.value)} maxLength={MAX_LENGTH} />
      </div>
      <div className='flex w-full justify-between'>
        <ToggleButton isSelected={isPrivate} label='비공개' onToggle={(newState) => setIsPrivate(newState)} />
        <Button size='xs' onClick={handleSave} disabled={isSaveDisabled}>
          {isSubmitting ? '저장 중...' : '저장'}
        </Button>
      </div>
    </div>
  );
}

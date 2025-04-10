'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetUser } from '@/apis/user/queries';
import { useModalStore } from '@/stores/ModalStore';
import { useDeleteEpigram } from '@/apis/epigram/queries';
import { useToast } from '@/utils/toast/ToastContext';
import DropdownMenu from '../ui/DropdownMenu';

interface EpigramDropdownProps {
  writerId: number;
  epigramId: number;
}

export default function EpigramDropdown({ writerId, epigramId }: EpigramDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const { openModal } = useModalStore();
  const { showToast } = useToast();
  const { data: user } = useGetUser();
  const deleteEpigramMutation = useDeleteEpigram();

  useEffect(() => {
    if (user) {
      setShowDropdown(user.id === writerId);
    }
  }, [user, writerId]);

  const handleEdit = () => {
    router.push(`/epigrams/${epigramId}/edit`);
  };

  const handleDeleteClick = () => {
    openModal({
      type: 'confirm',
      title: '에피그램 삭제',
      description: '정말로 이 에피그램을 삭제하시겠습니까?',
      okMessage: '삭제',
      cancelMessage: '취소',
      callback: () => {
        handleDelete();
      },
    });
  };

  const handleDelete = async () => {
    deleteEpigramMutation.mutate(epigramId, {
      onError: () => {
        showToast('에피그램 삭제 중 오류가 발생했습니다.', 'error', '삭제 실패');
      },
    });
  };

  const handleDropdownSelect = (option: string) => {
    if (option === '수정하기') {
      handleEdit();
    } else if (option === '삭제하기') {
      handleDeleteClick();
    }
  };

  if (!showDropdown) return null;

  return (
    <div className='absolute right-0 h-5 w-5 lg:h-9 lg:w-9' style={{ top: `calc(-1.5em - 8px)` }}>
      <DropdownMenu onSelect={handleDropdownSelect} className='h-[80px] w-[97px] lg:h-[112px] lg:w-[134px]' />
    </div>
  );
}

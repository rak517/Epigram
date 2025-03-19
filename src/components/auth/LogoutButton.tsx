'use client';

import { cn } from '@/utils/cn';
import logout from '@/actions/logoutAction';
import { useActionState, useEffect } from 'react';
import { useModalStore } from '@/stores/ModalStore';
import { useRouter } from 'next/navigation';

export default function LogoutButton({ className }: { className?: string }) {
  const [state, formAction, pending] = useActionState(logout, null);
  const router = useRouter();
  const { openModal } = useModalStore();

  useEffect(() => {
    if (!state) return;

    if (state.status) {
      openModal({
        type: 'alert',
        title: '로그아웃이 완료되었습니다.',
        callback: () => {
          window.location.href = '/login';
        },
      });
    } else {
      openModal({
        type: 'alert',
        title: '로그아웃에 실패했습니다.',
        description: '나중에 다시 시도해주세요.',
      });
    }
  }, [state, openModal, router]);

  return (
    <form action={formAction}>
      <button className={cn('bg-line-100 cursor-pointer rounded-full px-4 py-2 text-xl text-gray-300 disabled:cursor-not-allowed', className)} disabled={pending}>
        로그아웃
      </button>
    </form>
  );
}

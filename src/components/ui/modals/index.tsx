'use client';

import { modalVariants, useModalStore } from '@/stores/ModalStore';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { isEmpty } from 'es-toolkit/compat';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import CancelIcon from '@/assets/icons/Cancel_Icon.svg';
import { useEffect } from 'react';

const OVERLAY_VARIANTS = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
} as const;

const CONTENT_VARIANTS = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 },
};

export default function Modal() {
  const { modals, closeModal } = useModalStore();
  const isEmptyModals = isEmpty(modals);

  useEffect(() => {
    if (!isEmptyModals) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.marginRight = '';
    }
  }, [isEmptyModals]);

  if (isEmptyModals) return null;

  return createPortal(
    <div className='fixed inset-0 flex items-center justify-center'>
      {modals.map(({ id, content, size }) => (
        <motion.div key={id} className='fixed inset-0 flex items-center justify-center bg-black/40' initial='hidden' animate='show' variants={OVERLAY_VARIANTS} onClick={() => closeModal(id)}>
          <motion.div className={cn(modalVariants({ size }), 'flex flex-col items-center justify-between gap-6')} variants={CONTENT_VARIANTS} onClick={(e) => e.stopPropagation()}>
            <Image src={CancelIcon} alt='모달 닫기 아이콘' width={20} height={20} className='ml-auto size-5 cursor-pointer' onClick={() => closeModal(id)} />
            {content}
          </motion.div>
        </motion.div>
      ))}
    </div>,
    document.body!,
  );
}

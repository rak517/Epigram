import { create } from 'zustand';
import { ReactNode } from 'react';
import Alert from '@/components/ui/modals/Alert';
import Confirm from '@/components/ui/modals/Confirm';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlramMessage } from '@/components/ui/modals/types';

export const modalVariants = cva('rounded-lg bg-white px-10 py-6 shadow-lg ', {
  variants: {
    size: {
      sm: 'w-[320px] lg:w-[360px] xl:w-[400px]',
      md: 'w-[320px] md:w-[370px] lg:w-[450px] xl:w-[540px]',
      lg: 'w-3/5',
      xl: 'w-4/5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type ModalType = 'alert' | 'confirm' | 'custom';

export type Modal = {
  id: string;
  type: ModalType;
  content?: ReactNode;
} & VariantProps<typeof modalVariants> &
  Omit<AlramMessage, 'onClose'>;

type ModalStore = {
  modals: Modal[];
  openModal: (modal: Omit<Modal, 'id'>) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
};

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: [],

  openModal: (modal) => {
    const id = crypto.randomUUID();
    set((state) => {
      if (modal.type === 'alert')
        modal.content = <Alert title={modal.title} description={modal.description} okMessage={modal.okMessage} onClose={() => get().closeModal(id)} callback={modal.callback} />;
      else if (modal.type === 'confirm')
        modal.content = (
          <Confirm title={modal.title} description={modal.description} cancelMessage={modal.cancelMessage} okMessage={modal.okMessage} onClose={() => get().closeModal(id)} callback={modal.callback} />
        );
      return { modals: [...state.modals, { id, ...modal }] };
    });
    return id;
  },

  closeModal: (id) => {
    set((state) => ({
      modals: state.modals.filter((modal) => modal.id !== id),
    }));
  },

  closeAllModals: () => {
    set({ modals: [] });
  },
}));

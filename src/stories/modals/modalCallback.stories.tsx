import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/ui/buttons';
import { useModalStore } from '@/stores/ModalStore';
import Modal from '@/components/ui/modals';
import { Pretendard } from '@/fonts';
import { cn } from '@/utils/cn';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms));
}

const CallbackAlertDemo = () => {
  const { openModal } = useModalStore();

  const handleAsyncCallback = () => {
    openModal({
      type: 'alert',
      title: 'Async Alert 모달입니다.',
      size: 'md',
      callback: async () => {
        await delay(2000);
        openModal({
          type: 'alert',
          title: 'Async Alert 모달이 종료되었습니다.',
          size: 'sm',
        });
      },
    });
  };

  const handleSyncCallback = () => {
    openModal({
      type: 'alert',
      title: 'Sync Alert 모달입니다.',
      size: 'md',
      callback: () => {
        openModal({
          type: 'alert',
          title: 'Sync Alert 모달이 종료되었습니다.',
          size: 'sm',
        });
      },
    });
  };

  return (
    <div className={cn('flex flex-col gap-4', Pretendard.className)}>
      <Button onClick={handleAsyncCallback}>Alert Async Callback 열기</Button>
      <Button onClick={handleSyncCallback}>Alert Sync Callback 열기</Button>
    </div>
  );
};

const CallbackConfirmDemo = () => {
  const { openModal } = useModalStore();

  const handleAsyncCallback = () => {
    openModal({
      type: 'confirm',
      title: 'Async Confirm 모달입니다.',
      size: 'md',
      callback: async () => {
        await delay(2000);
        openModal({
          type: 'alert',
          title: 'Async Confirm 모달이 종료되었습니다.',
          size: 'sm',
        });
      },
    });
  };

  const handleSyncCallback = () => {
    openModal({
      type: 'confirm',
      title: 'Sync Confirm 모달입니다.',
      size: 'md',
      callback: () => {
        openModal({
          type: 'alert',
          title: 'Sync Confirm 모달이 종료되었습니다.',
          size: 'sm',
        });
      },
    });
  };

  return (
    <div className={cn('flex flex-col gap-4', Pretendard.className)}>
      <Button onClick={handleAsyncCallback}>Confirm Async Callback 열기</Button>
      <Button onClick={handleSyncCallback}>Confirm Sync Callback 열기</Button>
    </div>
  );
};

const meta: Meta = {
  title: 'Modals/Callback',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    componentSubtitle: 'callback prop은 확인 버튼을 누르면 동작하는 함수입니다. 비동기나 동기 함수 모두 지원합니다. 모달을 닫기 전에 실행하고 싶은 함수가 있을 경우 선택적으로 사용하시면 됩니다.',
  },
  decorators: [
    (Story) => (
      <div className={Pretendard.className}>
        <Modal />
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const AlertCallback: StoryObj = {
  render: () => <CallbackAlertDemo />,
};

export const ConfirmCallback: StoryObj = {
  render: () => <CallbackConfirmDemo />,
};

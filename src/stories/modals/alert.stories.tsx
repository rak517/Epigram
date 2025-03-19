import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/ui/buttons';
import { useModalStore } from '@/stores/ModalStore';
import Modal from '@/components/ui/modals';
import { Pretendard } from '@/fonts';

const AlertModalDemo = ({ size, okMessage }: { size?: 'sm' | 'md' | 'lg' | 'xl' | null; okMessage?: string }) => {
  const { openModal } = useModalStore();

  const handleOpenAlert = () => {
    openModal({
      type: 'alert',
      title: 'Alert 모달',
      description: 'Alert 모달입니다.',
      size,
      okMessage: okMessage ?? '확인',
    });
  };

  return (
    <div className={Pretendard.className}>
      <Button onClick={handleOpenAlert}>Alert 모달 열기</Button>
    </div>
  );
};

const meta: Meta = {
  title: 'Modals/Alert',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    componentSubtitle:
      'Alert 모달을 띄우고 싶을 때 사용합니다. type을 필수로 alert로 줘야하고, title과 description은 선택사항입니다. size의 경우 default는 md이며, sm, lg, xl 선택해서 사용하실 수 있습니다. "확인" 버튼 텍스트를 수정하고 싶다면 okMessage 프로퍼티를 주시면 됩니다.',
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

export const Default: StoryObj = {
  render: () => <AlertModalDemo />,
};

export const smSize: StoryObj = {
  render: () => <AlertModalDemo size='sm' />,
};

export const lgSize: StoryObj = {
  render: () => <AlertModalDemo size='lg' />,
};

export const xlSize: StoryObj = {
  render: () => <AlertModalDemo size='xl' />,
};

export const CustomOkMessage: StoryObj = {
  render: () => <AlertModalDemo okMessage='커스텀 메시지' />,
};

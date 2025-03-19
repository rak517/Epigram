import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/ui/buttons';
import { useModalStore } from '@/stores/ModalStore';
import Modal from '@/components/ui/modals';
import { Pretendard } from '@/fonts';

const ConfirmModalDemo = ({ size, okMessage, cancelMessage }: { size?: 'sm' | 'md' | 'lg' | 'xl' | null; cancelMessage?: string; okMessage?: string }) => {
  const { openModal } = useModalStore();

  const handleOpenConfirm = () => {
    openModal({
      type: 'confirm',
      title: 'Confirm 모달',
      description: 'Confirm 모달입니다.',
      size,
      cancelMessage: cancelMessage ?? '취소',
      okMessage: okMessage ?? '확인',
    });
  };

  return (
    <div className={Pretendard.className}>
      <Button onClick={handleOpenConfirm}>Confirm 모달 열기</Button>
    </div>
  );
};

const meta: Meta = {
  title: 'Modals/Confirm',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    componentSubtitle:
      'Confirm 모달을 띄우고 싶을 때 사용합니다. type을 필수로 confirm로 줘야하고, title과 description은 선택사항입니다. size의 경우 default는 md이며, sm, lg, xl 선택해서 사용하실 수 있습니다. "취소", "확인" 버튼의 텍스트를 커스텀하고 싶다면 각각 cancelMessage, okMessage 프로퍼티를 추가하시면 됩니다.',
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
  render: () => <ConfirmModalDemo />,
};

export const smSize: StoryObj = {
  render: () => <ConfirmModalDemo size='sm' />,
};

export const lgSize: StoryObj = {
  render: () => <ConfirmModalDemo size='lg' />,
};

export const xlSize: StoryObj = {
  render: () => <ConfirmModalDemo size='xl' />,
};

export const CustomCancelOkMessage: StoryObj = {
  render: () => <ConfirmModalDemo cancelMessage='취소 커스텀' okMessage='확인 커스텀' />,
};

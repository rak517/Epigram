import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/ui/buttons';
import { useModalStore } from '@/stores/ModalStore';
import Modal from '@/components/ui/modals';
import { Pretendard } from '@/fonts';
import ExampleForm from '@/components/ui/modals/example/ExampleForm';
import ExampleDialog from '@/components/ui/modals/example/ExampleDialog';

const CustomFormModalDemo = ({ size }: { size?: 'sm' | 'md' | 'lg' | 'xl' | null }) => {
  const { openModal } = useModalStore();

  const handleCustomModal = () => {
    openModal({
      type: 'custom',
      content: <ExampleForm />,
      size,
    });
  };

  return (
    <div className={Pretendard.className}>
      <Button onClick={handleCustomModal}>Custom Form 모달 열기</Button>
    </div>
  );
};

const CustomDialogModalDemo = ({ size }: { size?: 'sm' | 'md' | 'lg' | 'xl' | null }) => {
  const { openModal } = useModalStore();

  const handleCustomModal = () => {
    openModal({
      type: 'custom',
      content: <ExampleDialog message='custom dialog입니다.' />,
      size,
    });
  };

  return (
    <div className={Pretendard.className}>
      <Button onClick={handleCustomModal}>Custom Dialog 모달 열기</Button>
    </div>
  );
};

const meta: Meta = {
  title: 'Modals/Custom',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    componentSubtitle:
      'Custom 모달을 띄우고 싶을 때 사용합니다. type은 custom으로 줘야하고, content에 리액트 노드를 주시면 됩니다. size의 경우 default는 md이며, sm, lg, xl 선택해서 사용하실 수 있습니다. 커스텀 모달 컴포넌트의 샘플은 ui/modals/example 폴더 안에 생성하였으니, 참조하시기 바라겠습니다.',
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

export const FormDefault: StoryObj = {
  render: () => <CustomFormModalDemo />,
};

export const smSizeForm: StoryObj = {
  render: () => <CustomFormModalDemo size='sm' />,
};

export const lgSizeForm: StoryObj = {
  render: () => <CustomFormModalDemo size='lg' />,
};

export const xlSizeForm: StoryObj = {
  render: () => <CustomFormModalDemo size='xl' />,
};

export const DialogDefault: StoryObj = {
  render: () => <CustomDialogModalDemo />,
};

export const smSizeDialog: StoryObj = {
  render: () => <CustomDialogModalDemo size='sm' />,
};

export const lgSizeDialog: StoryObj = {
  render: () => <CustomDialogModalDemo size='lg' />,
};

export const xlSizeDialog: StoryObj = {
  render: () => <CustomDialogModalDemo size='xl' />,
};

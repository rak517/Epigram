import type { Meta, StoryObj } from '@storybook/react';
import { RadioItem } from '@/components/ui/radio/RadioItem';
import { RadioGroup } from '@/components/ui/radio/RadioGroup';

const meta: Meta<typeof RadioItem> = {
  title: 'Radio/RadioItem',
  component: RadioItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'RadioItem 컴포넌트는 단일 라디오 버튼 항목을 렌더링합니다. RadioGroup 컨테이너 내에서 사용되며, 버튼과 함께 라벨을 표시하여 선택 상태를 쉽게 확인할 수 있도록 도와줍니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div role='radiogroup' className='flex flex-col gap-2 rounded bg-gray-100 p-4'>
        <RadioGroup>
          <Story />
        </RadioGroup>
      </div>
    ),
  ],
  argTypes: {
    radioSize: {
      options: ['sm', 'md'],
      control: { type: 'select' },
    },
    label: { control: 'text' },
    value: { control: 'text' },
    id: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof RadioItem>;

export const Default: Story = {
  args: {
    id: 'option1',
    value: 'option1',
    label: '옵션 1',
    radioSize: 'md',
  },
};

export const Small: Story = {
  args: {
    id: 'option2',
    value: 'option2',
    label: '옵션 2 (Small)',
    radioSize: 'sm',
  },
};

export const Medium: Story = {
  args: {
    id: 'option3',
    value: 'option3',
    label: '옵션 3 (Medium)',
    radioSize: 'md',
  },
};

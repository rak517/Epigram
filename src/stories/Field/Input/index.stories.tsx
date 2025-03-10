import type { Meta, StoryObj } from '@storybook/react';
import { cn } from '@/utils/cn';
import Input from '@/components/ui/Field/Input';
import { Pretendard } from '@/fonts';

const meta: Meta<typeof Input> = {
  title: 'Field/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className={cn('flex items-center justify-center rounded-2xl bg-white', Pretendard.className)}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      options: ['default', 'outlined'],
      control: { type: 'select' },
    },
    label: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력해주세요.',
    className: 'w-full',
  },
};

export const Outlined: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    variant: 'outlined',
  },
};

export const WithError: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력해주세요.',
    error: '유효하지 않은 이메일 형식입니다.',
    className: '',
  },
};

export const WithRequired: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력해주세요.',
    className: '',
    required: true,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { cn } from '@/utils/cn';
import TextArea from '@/components/ui/textarea';
import { Pretendard } from '@/fonts';

const meta: Meta<typeof TextArea> = {
  title: 'TextArea/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className={cn('rounded-xl bg-white', Pretendard.className)}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      options: ['limit100', 'limit500'],
      control: { type: 'select' },
    },

    size: {
      options: ['sm', 'md', 'lg', '100sm', '100md', '100lg'],
      control: { type: 'select' },
    },
    fontSize: {
      options: ['base', 'xl'],
      control: { type: 'select' },
    },
    border: {
      options: ['line-border', 'blue-border'],
      control: { type: 'select' },
    },
    borderRadius: {
      options: ['lg', 'xl'],
      control: { type: 'select' },
    },
    placeholder: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Small100: Story = {
  args: {
    variant: 'limit100',
    size: '100sm',
    fontSize: 'base',
    border: 'line-border',
    borderRadius: 'lg',
    placeholder: '100자 이내로 입력해주세요.',
  },
};

export const Medium100: Story = {
  args: {
    variant: 'limit100',
    size: '100md',
    fontSize: 'base',
    border: 'line-border',
    borderRadius: 'lg',
    placeholder: '100자 이내로 입력해주세요.',
  },
};

export const Large100: Story = {
  args: {
    variant: 'limit100',
    size: '100lg',
    fontSize: 'xl',
    border: 'line-border',
    borderRadius: 'lg',
    placeholder: '100자 이내로 입력해주세요.',
  },
};

export const Small500: Story = {
  args: {
    variant: 'limit500',
    size: 'sm',
    fontSize: 'base',
    border: 'blue-border',
    borderRadius: 'xl',
    placeholder: '500자 이내로 입력해주세요.',
  },
};

export const Medium500: Story = {
  args: {
    variant: 'limit500',
    size: 'md',
    fontSize: 'base',
    border: 'blue-border',
    borderRadius: 'xl',
    placeholder: '500자 이내로 입력해주세요.',
  },
};

export const Large500: Story = {
  args: {
    variant: 'limit500',
    size: 'lg',
    fontSize: 'xl',
    border: 'blue-border',
    borderRadius: 'xl',
    placeholder: '500자 이내로 입력해주세요.',
  },
};

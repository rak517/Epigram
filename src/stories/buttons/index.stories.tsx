import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '@/components/ui/buttons';
import { cn } from '@/utils/cn';
import { Pretendard } from '@/fonts';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className={cn('flex h-[300px] w-[500px] items-center justify-center rounded-2xl bg-gray-100', Pretendard.className)}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      options: ['default', 'outline'],
      control: { type: 'select' },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    disabled: {
      options: [false, true],
      control: { type: 'inline-radio' },
    },
    children: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '시작하기',
    disabled: false,
    onClick: action('default variant 클릭'),
    className: '',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: '시작하기',
    disabled: false,
    onClick: action('outline variant 클릭'),
    className: '',
  },
};

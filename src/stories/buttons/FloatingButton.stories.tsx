import type { Meta, StoryObj } from '@storybook/react';
import FloatingButton from '@/components/ui/buttons/FloatingButton';
import { cn } from '@/utils/cn';
import { Pretendard } from '@/fonts';

const meta: Meta<typeof FloatingButton> = {
  title: 'Button/FloatingButton',
  component: FloatingButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className={cn('flex h-[300px] w-[500px] items-center justify-center rounded-2xl bg-green-200', Pretendard.className)}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      options: ['md', 'lg'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingButton>;

export const Default: Story = {
  args: {},
};
export const LargeSize: Story = {
  args: {
    size: 'lg',
    className: '',
  },
};

export const CustomPosition: Story = {
  args: {
    size: 'lg',
    className: 'top-8 left-8',
  },
};

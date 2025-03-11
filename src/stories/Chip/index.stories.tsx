import Chip from '@/components/ui/Chip';
import { Pretendard } from '@/fonts';
import { cn } from '@/utils/cn';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Chip> = {
  title: 'Chip/Chip',
  component: Chip,
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
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    label: '#코드잇',
    className: '',
  },
};

export const CustomClass: Story = {
  args: {
    label: '커스텀',
    className: 'bg-sub-yellow',
  },
};

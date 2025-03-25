import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DropdownMenu from '@/components/ui/DropdownMenu';
import { cn } from '@/utils/cn';
import { Pretendard } from '@/fonts';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
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
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    options: {
      control: { type: 'object' },
    },
    onSelect: { action: 'option selected' },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  args: {
    options: ['수정하기', '삭제하기'],
    onSelect: action('option selected'),
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    options: ['수정하기', '삭제하기'],
    onSelect: action('option selected'),
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    options: ['수정하기', '삭제하기'],
    onSelect: action('option selected'),
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    options: ['수정하기', '삭제하기'],
    onSelect: action('option selected'),
  },
};

export const CustomOptions: Story = {
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    onSelect: action('option selected'),
  },
};

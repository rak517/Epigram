import type { Meta, StoryObj } from '@storybook/react';
import Avatar from '@/components/ui/avatars';
import { cn } from '@/utils/cn';
import { Pretendard } from '@/fonts';

const TEST_IMAGE_URL =
  'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wikied/user/1257/1741667179501/%C3%AD%C2%85%C2%8C%C3%AC%C2%8A%C2%A4%C3%AD%C2%8A%C2%B8%20%C3%AC%C2%9D%C2%B4%C3%AB%C2%AF%C2%B8%C3%AC%C2%A7%C2%80.png';

const meta: Meta<typeof Avatar> = {
  title: 'Avatar/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className={cn('flex h-[300px] w-[500px] items-center justify-center rounded-2xl bg-red-200', Pretendard.className)}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      options: ['default', 'lg'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    size: 'default',
    src: TEST_IMAGE_URL,
    alt: '테스트 이미지',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    src: TEST_IMAGE_URL,
    alt: '테스트 이미지',
  },
};

export const NoSrcLargeSize: Story = {
  args: {
    size: 'lg',
    alt: '테스트 이미지',
  },
};

export const NullSrcLargeSize: Story = {
  args: {
    size: 'lg',
    src: null,
    alt: '테스트 이미지',
  },
};

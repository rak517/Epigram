import Comment from '@/components/ui/comment';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Comment> = {
  title: 'Components/Comment',
  component: Comment,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOwnComment: {
      control: 'boolean',
    },
    nickname: {
      control: 'text',
    },
    commentTime: {
      control: 'text',
    },
    content: {
      control: 'text',
    },
    profileImage: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {
  args: {
    isOwnComment: false,
    nickname: '지킬 앤 하이드',
    commentTime: '1시간 전',
    content:
      '오늘 하루 우울했었는데 덕분에 많은 힘 얻고 갑니다. 연금술사 책 다시 사서 오랜만에 읽어봐야겠어요!',
    profileImage: 'https://via.placeholder.com/48',
  },
};

export const OwnComment: Story = {
  args: {
    isOwnComment: true,
    nickname: '지킬 앤 하이드',
    commentTime: '1시간 전',
    content:
      '오늘 하루 우울했었는데 덕분에 많은 힘 얻고 갑니다. 연금술사 책 다시 사서 오랜만에 읽어봐야겠어요!',
    profileImage: 'https://via.placeholder.com/48',
  },
};

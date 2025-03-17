import EmotionButton from '@/components/ui/emotionButton';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof EmotionButton> = {
  title: 'Button/EmotionButton',
  component: EmotionButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div>
        <Story></Story>
      </div>
    ),
  ],
  argTypes: {
    buttonVariant: {
      options: ['default', 'onSelect'],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    emotion: {
      options: ['기쁨', '슬픔', '감동', '고민', '분노'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmotionButton>;

export const Default: Story = {
  args: {
    buttonVariant: 'default',
    size: 'sm',
    emotion: '기쁨',
  },
};

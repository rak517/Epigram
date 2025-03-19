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
      control: { type: 'boolean' },
    },
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    emotion: {
      options: ['HAPPY', 'SAD', 'MOVED', 'WORRIED', 'ANGRY'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmotionButton>;

export const Default: Story = {
  args: {
    buttonVariant: false,
    size: 'sm',
    emotion: 'HAPPY',
  },
};

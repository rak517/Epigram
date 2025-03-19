import Emotion from '@/components/ui/emotion';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Emotion> = {
  title: 'Emotion/Emotion',
  component: Emotion,
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
    variant: {
      options: ['default', 'grayScales'],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Emotion>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
};

export const grayScales: Story = {
  args: {
    variant: 'grayScales',
    size: 'md',
  },
};

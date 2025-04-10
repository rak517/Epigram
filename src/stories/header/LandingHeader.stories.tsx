import LandingHeader from '@/components/ui/header/LandingHeader';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LandingHeader> = {
  title: 'Header/LandingHeader',
  component: LandingHeader,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true, // App Router를 모의하기 위한 설정
    },
    backgrounds: {
      default: 'homeBackgroundColor',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'homeBackgroundColor', value: '#f5f7fa' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className='bg-[#ffffff]'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    showIcon: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof LandingHeader>;

export const Default: Story = {
  args: {
    showIcon: false,
  },
};

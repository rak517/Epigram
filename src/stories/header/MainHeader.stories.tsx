import MainHeader from '@/components/ui/header/MainHeader';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MainHeader> = {
  title: 'Header/MainHeader',
  component: MainHeader,
  tags: ['autodocs'],
  parameters: {
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
        <Story></Story>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MainHeader>;

export const Default: Story = {
  args: {
    title: '메인 헤더',
  },
};

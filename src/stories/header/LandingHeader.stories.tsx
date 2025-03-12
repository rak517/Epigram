import LandingHeader from '@/components/ui/header/LandingHeader';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LandingHeader> = {
  title: 'Header/LandingHeader',
  component: LandingHeader,
  decorators: [
    (Story) => (
      <div className=''>
        <Story></Story>
      </div>
    ),
  ],
  argTypes: {
    showIcon: {
      options: [false, true],
      control: { type: 'select' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof LandingHeader>;

export const Default: Story = {};

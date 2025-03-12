import type { Meta, StoryObj } from '@storybook/react';
import SideBar from '../../components/ui/sideBar';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof SideBar> = {
  title: 'Components/SideBar',
  component: SideBar,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  argTypes: {
    onSelectedTab: { 
      action: 'onSelectedTab', // action 정의
    },
  },
};

export default meta;
type Story = StoryObj<typeof SideBar>;

export const Default: Story = {
  args: {
    onSelectedTab: (tab) => {
      console.log(`Selected Tab: ${tab}`);
      action('onSelectedTab')(tab);
    },
    isOpen: false,
  },
};

export const Open: Story = {
  args: {
    onSelectedTab: action('onSelectedTab'),
    isOpen: true,
  },
};

export const Closed: Story = {
  args: {
    onSelectedTab: action('onSelectedTab'),
    isOpen: false,
  },
};

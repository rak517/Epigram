import type { Meta, StoryObj } from '@storybook/react';
import SideBar from '@/components/ui/sideBar';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof SideBar> = {
  title: 'Components/SideBar',
  component: SideBar,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
};

export default meta;
type Story = StoryObj<typeof SideBar>;

const sampleItems = [
  { label: '피드', value: 'feed' },
  { label: '검색', value: 'search' },
  { label: '설정', value: 'settings' },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    onSelect: (tab) => {
      console.log(`Selected Tab: ${tab}`);
      action('onSelect')(tab);
    },
    isOpen: false,
  },
};

export const Open: Story = {
  args: {
    items: sampleItems,
    onSelect: action('onSelect'),
    isOpen: true,
  },
};

export const Closed: Story = {
  args: {
    items: sampleItems,
    onSelect: action('onSelect'),
    isOpen: false,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import SideBar from '@/components/ui/sideBar';

const meta: Meta<typeof SideBar> = {
  title: 'Components/SideBar',
  component: SideBar,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
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
    isOpen: true,
  },
};

export const Open: Story = {
  args: {
    items: sampleItems,
    isOpen: true,
  },
};

export const Closed: Story = {
  args: {
    items: sampleItems,
    isOpen: false,
  },
};

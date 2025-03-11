import type { Meta, StoryObj } from '@storybook/react';
import MobileSidebar from './index';

const meta: Meta<typeof MobileSidebar> = {
  title: 'Components/MobileSidebar',
  component: MobileSidebar,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

export default meta;
type Story = StoryObj<typeof MobileSidebar>;

export const Default: Story = {};

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import RoundedButton, { RoundedButtonProps } from '@/components/ui/buttons/roundedButton';

export default {
  title: 'Button/RoundedButton',
  component: RoundedButton,
  decorators: [
    (Story) => (
      <div className="whitespace-nowrap">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['더보기', '에픽그램', '좋아요버튼', '왕도로가는길', '커스텀'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    backgroundColor: {
      control: 'color',
      if: { arg: 'type', eq: '커스텀' },
    },
    text: {
      control: 'text',
      if: { arg: 'type', eq: '커스텀' },
    },
  },
} as Meta<typeof RoundedButton>;

const Template: StoryFn<RoundedButtonProps> = (args) => <RoundedButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: '더보기',
  size: 'medium',
};

export const Custom = Template.bind({});
Custom.args = {
  type: '커스텀',
  size: 'medium',
  backgroundColor: 'blue',
  text: '사용자 지정',
};

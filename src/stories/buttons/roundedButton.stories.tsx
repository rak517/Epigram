import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import RoundedButton, { RoundedButtonProps } from '@/components/ui/buttons/roundedButton';

export default {
  title: 'Button/RoundedButton',
  component: RoundedButton,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'tertiary', 'outline'],
    },
    className: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} as Meta<typeof RoundedButton>;

const Template: StoryFn<RoundedButtonProps> = (args) => <RoundedButton {...args} />;

// 왕도로 가는길은 Default 사용
export const Default = Template.bind({});
Default.args = {
  size: 'md',
  variant: 'default',
  children: '기본 버튼',
};

// 좋아요 버튼은 secondary 사용
export const Secondary = Template.bind({});
Secondary.args = {
  size: 'md',
  variant: 'secondary',
  children: 'Secondary 버튼',
};

// 에픽그램 만들기 버튼은 tertiary
export const Tertiary = Template.bind({});
Tertiary.args = {
  size: 'md',
  variant: 'tertiary',
  children: 'Tertiary 버튼',
};

// 더보기, 에픽그램 및 댓글추가 Outline
export const Outline = Template.bind({});
Outline.args = {
  size: 'md',
  variant: 'outline',
  children: 'Outline 버튼',
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  variant: 'default',
  children: 'Large 버튼',
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  size: 'xl',
  variant: 'default',
  children: 'XL 버튼',
};

export const Disabled = Template.bind({});
Disabled.args = {
  size: 'md',
  variant: 'default',
  disabled: true,
  children: '비활성화 버튼',
};

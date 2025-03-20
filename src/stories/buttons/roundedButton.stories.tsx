import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import RoundedButton, { RoundedButtonProps } from '@/components/ui/buttons/roundedButton';
import Image from 'next/image';
import plus from '@/assets/icons/plus.svg';

export default {
  title: 'Button/RoundedButton',
  component: RoundedButton,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'], 
    },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
  },
} as Meta<typeof RoundedButton>;


const Template: StoryFn<RoundedButtonProps> = (args) => <RoundedButton {...args} />;


export const Default = Template.bind({});
Default.args = {
  size: 'md',
  children: '기본 버튼',
};


export const Disabled = Template.bind({});
Disabled.args = {
  size: 'md',
  disabled: true,
  children: '비활성화 버튼',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  size: 'md',
  children: (
    <>
      <Image src={plus} alt="더하기 아이콘" width={20} height={20} />
      <span>추가</span> 
    </>
  ),
};

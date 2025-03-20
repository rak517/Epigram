import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import RoundedButton, { RoundedButtonProps } from '@/components/ui/buttons/roundedButton';
import Image from 'next/image';
import plus from '@/assets/icons/plus.svg';

export default {
  title: 'Button/RoundedButton',
  component: RoundedButton,
  decorators: [
    (Story) => (
      <div className='whitespace-nowrap'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    backgroundColor: { control: 'color' },
    borderColor: { control: 'color' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
  },
} as Meta<typeof RoundedButton>;

const Template: StoryFn<RoundedButtonProps> = (args) => <RoundedButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'medium',
  backgroundColor: 'transparent',
  borderColor: 'rgba(207, 219, 234, 1)',
  children: (
    <>
      <Image src={plus} alt='더보기 아이콘' width={24} height={24} />
      텍스트
    </>
  ),
};

export const Disabled = Template.bind({});
Disabled.args = {
  size: 'medium',
  backgroundColor: 'gray',
  borderColor: 'gray',
  disabled: true,
  children: '비활성화 버튼',
};

export const CustomHeight = Template.bind({}); // 사이즈 안 주고 커스텀 
CustomHeight.args = {
  backgroundColor: 'blue',
  borderColor: 'blue',
  className: 'h-[60px] w-[200px] text-xl font-bold', 
  children: '커스텀 높이 버튼',
};


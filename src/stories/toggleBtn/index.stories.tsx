import React, { useState, useEffect } from 'react';
import ToggleBtn from '@/components/ui/toggleBtn';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/ToggleButton',
  component: ToggleBtn,
  argTypes: {
    size: {
      control: {
        type: 'radio',
        options: ['sm', 'md'],
      },
      defaultValue: 'md',
    },
    isSelected: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta;

const Template: StoryFn = (args) => {
  const [isSelected, setIsSelected] = useState(args.isSelected);

  const handleToggle = (newState: boolean) => {
    setIsSelected(newState);
    args.onToggle(newState);
  };

  useEffect(() => {
    setIsSelected(args.isSelected);
  }, [args.isSelected]);

  return <ToggleBtn {...args} isSelected={isSelected} onToggle={handleToggle} />;
};

export const Default = Template.bind({});
Default.args = {
  size: 'md',
  isSelected: false,
  onToggle: (newState: boolean) => {
    console.log('New state:', newState);
  },
};

export const Sm = Template.bind({});
Sm.args = {
  size: 'sm',
  isSelected: false,
  onToggle: (newState: boolean) => {
    console.log('New state:', newState);
  },
};

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
        options: ['small', 'medium'],
      },
      defaultValue: 'medium',
    },
    isOn: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta;

const Template: StoryFn = (args) => {
  const [isOn, setIsOn] = useState(args.isOn);

  const handleToggle = (newState: boolean) => {
    setIsOn(newState);
    args.onToggle(newState);
  };

  useEffect(() => {
    setIsOn(args.isOn);
  }, [args.isOn]);

  return <ToggleBtn {...args} isOn={isOn} onToggle={handleToggle} />;
};

export const Default = Template.bind({});
Default.args = {
  size: 'medium',
  isOn: false,
  onToggle: (newState: boolean) => {
    console.log('New state:', newState);
  },
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  isOn: false,
  onToggle: (newState: boolean) => {
    console.log('New state:', newState);
  },
};

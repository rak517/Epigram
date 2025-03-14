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
    isPublic: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta;

const Template: StoryFn = (args) => {
  const [isPublic, setIsPublic] = useState(args.isPublic);

  const handleToggle = (newState: boolean) => {
    setIsPublic(newState);
    args.onToggle(newState);
  };

  useEffect(() => {
    setIsPublic(args.isPublic);
  }, [args.isPublic]);

  return <ToggleBtn {...args} isPublic={isPublic} onToggle={handleToggle} />;
};

export const Default = Template.bind({});
Default.args = {
  size: 'medium',
  isPublic: false,
  onToggle: (newState: boolean) => {
    console.log('New state:', newState);
  },
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  isPublic: false,
  onToggle: (newState: boolean) => {
    console.log('New state:', newState);
  },
};

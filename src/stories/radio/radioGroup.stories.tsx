import React, { ComponentProps, useState } from 'react';
import { RadioGroup } from '@/components/ui/radio/RadioGroup';
import { RadioItem } from '@/components/ui/radio/RadioItem';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RadioGroup> = {
  title: 'Radio/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'RadioGroup 컴포넌트는 여러 RadioItem들을 그룹화하여 하나의 선택 그룹을 형성합니다. 내부 상태를 관리하며, 사용자가 선택을 변경할 때 onValueChange 콜백을 통해 변경된 값을 외부로 전달합니다.',
      },
    },
  },

  argTypes: {
    defaultValue: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const DefaultTemplate = (args: ComponentProps<typeof RadioGroup>) => {
  const [selected, setSelected] = useState(args.defaultValue || 'option1');
  return (
    <RadioGroup defaultValue={selected} onValueChange={setSelected} {...args}>
      <RadioItem value='option1' id='option1' radioSize='md' label='옵션 1' />
      <RadioItem value='option2' id='option2' radioSize='md' label='옵션 2' />
      <RadioItem value='option3' id='option3' radioSize='md' label='옵션 3' />
    </RadioGroup>
  );
};

export const Default: Story = {
  render: DefaultTemplate,
  args: {
    defaultValue: 'option1',
  },
};

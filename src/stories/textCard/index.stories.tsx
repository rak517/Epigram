import TextCard from '@/components/ui/textcard';
import { Iropke } from '@/fonts';
import { cn } from '@/utils/cn';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextCard> = {
  title: 'TextCard/TextCard',
  component: TextCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  decorators: [
    (Story) => (
      <div className={cn('rounded-xl bg-white', Iropke.className)}>
        <Story />
      </div>
    ),
  ],

  argTypes: {
    variant: {
      options: ['fixedHeight', 'variantHeight'],
      control: { type: 'select' },
    },

    width: {
      options: ['w286', 'w294', 'w312', 'w366', 'w384', 'w472', 'w540', 'w585', 'w640', 'w744'],
      control: { type: 'select' },
    },

    fixedSize: {
      options: ['w294h214', 'w312h172', 'w585h307'],
      control: { type: 'select' },
    },

    tagPosition: {
      options: ['topLeft', 'bottomRight'],
      control: { type: 'select' },
    },

    hasBackground: {
      options: ['true', 'false'],
      control: { type: 'select' },
    },
  },
};

type Story = StoryObj<typeof TextCard>;

export default meta;

export const variableDefault: Story = {
  args: {
    variant: 'variableHeight',
    width: 'w286',
    tagPosition: 'bottomRight',
    tags: [
      { id: 1, name: '태그내용' },
      { id: 2, name: '나는 태그입니다' },
    ],
    cardContent: '여기에 카드 내용이 들어갑니다.',
    author: '저자 이름',
  },
};

export const variableW312: Story = {
  args: {
    variant: 'variableHeight',
    width: 'w312',
    tagPosition: 'bottomRight',
    tags: [
      { id: 1, name: '태그내용' },
      { id: 2, name: '나는 태그입니다' },
    ],
    cardContent: '여기에 카드 내용이 들어갑니다.',
    author: '저자 이름',
  },
};

export const variableW384: Story = {
  args: {
    variant: 'variableHeight',
    width: 'w384',
    tagPosition: 'bottomRight',
    tags: [
      { id: 1, name: '태그내용' },
      { id: 2, name: '나는 태그입니다' },
    ],
    cardContent: '여기에 카드 내용이 들어갑니다.',
    author: '저자 이름',
  },
};

export const variableW540: Story = {
  args: {
    variant: 'variableHeight',
    width: 'w540',
    tagPosition: 'bottomRight',
    tags: [
      { id: 1, name: '태그내용' },
      { id: 2, name: '나는 태그입니다' },
    ],
    cardContent: '여기에 카드 내용이 들어갑니다.',
    author: '저자 이름',
  },
};

export const variableW640: Story = {
  args: {
    variant: 'variableHeight',
    width: 'w640',
    tagPosition: 'bottomRight',
    tags: [
      { id: 1, name: '태그내용' },
      { id: 2, name: '나는 태그입니다' },
    ],
    cardContent: '여기에 카드 내용이 들어갑니다.',
    author: '저자 이름',
  },
};

export const variableW744: Story = {
  args: {
    variant: 'variableHeight',
    width: 'w744',
    tagPosition: 'bottomRight',
    tags: [
      { id: 1, name: '태그내용' },
      { id: 2, name: '나는 태그입니다' },
    ],
    cardContent: '여기에 카드 내용이 들어갑니다.',
    author: '저자 이름',
  },
};

export const fixedW294: Story = {
  args: {
    variant: 'fixedHeight',
    fixedSize: 'w294h180',
    tagPosition: 'bottomRight',
    tags: [
      { id: 1, name: '태그내용' },
      { id: 2, name: '나는 태그입니다' },
    ],
    cardContent: '여기에 카드 내용이 들어갑니다.',
    author: '저자 이름',
  },
};

export const fixedW312: Story = {
  args: {
    variant: 'fixedHeight',
    fixedSize: 'w312h140',
    tagPosition: 'bottomRight',
    tags: [
      { id: 1, name: '태그내용' },
      { id: 2, name: '나는 태그입니다' },
    ],
    cardContent: '여기에 카드 내용이 들어갑니다.',
    author: '저자 이름',
  },
};

export const fixedW585: Story = {
  args: {
    variant: 'fixedHeight',
    fixedSize: 'w585h259',
    tagPosition: 'bottomRight',
    tags: [
      { id: 1, name: '태그내용' },
      { id: 2, name: '나는 태그입니다' },
    ],
    cardContent: '여기에 카드 내용이 들어갑니다.',
    author: '저자 이름',
  },
};

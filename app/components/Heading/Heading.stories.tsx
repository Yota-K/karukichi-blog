import { Heading } from './Heading';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Heading',
  component: Heading,
  tags: ['autodocs'],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    as: 'h1',
    size: 'xl',
    children: 'heading1',
  },
};

export const Heading2: Story = {
  args: {
    as: 'h2',
    size: 'lg',
    children: 'heading2',
  },
};

export const Heading3: Story = {
  args: {
    as: 'h3',
    size: 'md',
    children: 'heading3',
  },
};

export const Heading4: Story = {
  args: {
    as: 'h4',
    size: 'sm',
    children: 'heading4',
  },
};

export const Heading5: Story = {
  args: {
    as: 'h5',
    size: 'xs',
    children: 'heading5',
  },
};

export const Heading6: Story = {
  args: {
    as: 'h6',
    size: 'xs',
    children: 'heading6',
  },
};

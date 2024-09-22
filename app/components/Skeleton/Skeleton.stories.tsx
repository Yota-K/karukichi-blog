import { Skeleton } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    length: {
      control: {
        type: 'number',
        value: 1,
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

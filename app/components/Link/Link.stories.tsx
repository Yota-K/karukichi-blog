import { Link } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Link',
  component: Link,
  tags: ['autodocs'],
} as Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    to: '/',
    children: 'link',
  },
};

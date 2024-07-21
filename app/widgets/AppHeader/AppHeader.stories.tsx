import { AppHeader } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'widgets/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

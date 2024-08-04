import { ProfileArea } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'features/profile/ProfileArea',
  component: ProfileArea,
} satisfies Meta<typeof ProfileArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

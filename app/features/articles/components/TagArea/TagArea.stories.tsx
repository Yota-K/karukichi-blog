import { contentsMock } from '../../../../__helpers__';

import { TagArea } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'features/articles/components/TagArea',
  component: TagArea,
} satisfies Meta<typeof TagArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tagField: contentsMock[0].tag_field,
  },
};

import { generateMockContent } from '../../../__helpers__';

import { PostItem } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const mockContent = generateMockContent();

const meta = {
  title: 'features/articles/PostItem',
  component: PostItem,
} satisfies Meta<typeof PostItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: mockContent,
  },
};

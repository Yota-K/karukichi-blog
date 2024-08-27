import { mockContentListResponse } from '../../../__helpers__';

import { PostList } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'features/articles/PostList',
  component: PostList,
} satisfies Meta<typeof PostList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    contents: mockContentListResponse.contents,
  },
};

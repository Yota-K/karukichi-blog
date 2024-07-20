import { contentMock } from '../../../../__helpers__';

import { ContentBody } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'features/articles/components/ContentBody',
  component: ContentBody,
} satisfies Meta<typeof ContentBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    body: contentMock.body,
  },
};

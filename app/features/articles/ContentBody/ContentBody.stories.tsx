import { generateMockContent } from '../../../__helpers__';

import { ContentBody } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const { body } = generateMockContent();

const meta = {
  title: 'features/articles/ContentBody',
  component: ContentBody,
} satisfies Meta<typeof ContentBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    body,
  },
};

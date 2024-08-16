import { Toc } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'features/articles/Toc',
  component: Toc,
} satisfies Meta<typeof Toc>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    toc: [
      {
        id: '1',
        text: 'test',
        tagName: 'h2',
      },
      {
        id: '2',
        text: 'test',
        tagName: 'h2',
      },
      {
        id: '3',
        text: 'test',
        tagName: 'h2',
      },
    ],
  },
};

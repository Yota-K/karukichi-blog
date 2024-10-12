import { generateMockContent } from '../../../__helpers__';

import { TagSection, TagArea} from '.';

import type { Meta, StoryObj } from '@storybook/react';

const { tag_field } = generateMockContent();

const meta = {
  title: 'features/articles/TagArea',
  component: TagArea,
} satisfies Meta<typeof TagArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tags: tag_field,
  },
};

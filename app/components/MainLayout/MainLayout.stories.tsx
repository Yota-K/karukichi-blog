import { MainLayout } from './MainLayout';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/MainLayout',
  component: MainLayout,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MainLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </>
    ),
  },
};

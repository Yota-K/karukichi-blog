import { DisplayErrorMessage } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'widgets/DisplayErrorMessage',
  component: DisplayErrorMessage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DisplayErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotFoundError: Story = {
  args: {
    statusCode: 404,
  },
};

export const ServerError: Story = {
  args: {
    statusCode: 500,
  },
};

export const UnexpectedError: Story = {
  args: {
    statusCode: undefined,
  },
};

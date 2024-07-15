import { contentMock } from '../../../../__helpers__'

import { PostItem } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'features/articles/components/PostItem',
  component: PostItem,
} satisfies Meta<typeof PostItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: contentMock,
  },
}

import { Text } from './Text'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Text',
  component: Text,
  tags: ['autodocs'],
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
    children: 'Hello, world!',
  },
}

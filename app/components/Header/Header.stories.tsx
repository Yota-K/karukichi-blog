import { Heading } from '../Heading'

import { Header } from './Header'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
    children: (
      <Heading as="h1" size="xl" className="text-white">
        title
      </Heading>
    ),
  },
}

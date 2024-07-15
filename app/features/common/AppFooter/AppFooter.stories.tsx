import { AppFooter } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'features/common/AppFooter',
  component: AppFooter,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

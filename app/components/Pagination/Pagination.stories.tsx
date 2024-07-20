import { Pagination } from './Pagination'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    paginateNum: 2,
    totalCount: 100,
  },
}

export const First: Story = {
  args: {
    paginateNum: 1,
    totalCount: 100,
  },
}

export const Last: Story = {
  args: {
    paginateNum: 10,
    totalCount: 100,
  },
}

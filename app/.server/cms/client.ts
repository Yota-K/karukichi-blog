import { createClient } from 'microcms-js-sdk'

import { env } from '../../env/env.server'

export const endpoints = {
  blogs: 'blogs',
  category: 'category',
  tags: 'tags',
} as const

export const client = createClient({
  serviceDomain: 'karukichi-tech-blog',
  apiKey: env.CMS_API_KEY,
})

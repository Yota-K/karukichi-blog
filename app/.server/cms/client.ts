import { createClient } from 'microcms-js-sdk'

export const client = (env: Env) =>
  createClient({
    serviceDomain: 'karukichi-tech-blog',
    apiKey: env.CMS_API_KEY,
  })

export type ClientType = ReturnType<typeof client>

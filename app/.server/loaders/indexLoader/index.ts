import { json } from '@remix-run/cloudflare'

import { client, getPosts } from '../../cms'

import type { LoaderFunctionArgs } from '@remix-run/cloudflare'

export const indexLoader = async ({ context }: LoaderFunctionArgs) => {
  const { CMS_API_KEY } = context.cloudflare.env
  const cmsClient = client(CMS_API_KEY)
  const posts = await getPosts(cmsClient)
  return json({ ...posts })
}

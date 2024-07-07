import { json } from '@remix-run/cloudflare'

import { client, getPosts } from '../../cms'

import type { LoaderFunctionArgs } from '@remix-run/cloudflare'

export const indexLoader = async ({ context }: LoaderFunctionArgs) => {
  const cmsClient = client(context.cloudflare.env)
  const posts = await getPosts(cmsClient)
  return json({ ...posts })
}

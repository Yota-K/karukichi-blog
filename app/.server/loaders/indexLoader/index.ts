import { json } from '@remix-run/cloudflare'

import { getPosts } from '../../cms'

export const loader = async () => {
  const posts = await getPosts()
  return json({ ...posts })
}

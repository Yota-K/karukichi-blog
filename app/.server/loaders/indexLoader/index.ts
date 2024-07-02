import { json } from '@remix-run/node'

import { getPosts } from '../../cms'

export const loader = async () => {
  const posts = await getPosts()
  return json({ ...posts })
}

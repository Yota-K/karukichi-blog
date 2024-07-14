import { json } from '@remix-run/cloudflare'

import { client, getPosts } from '../../cms'

import type { Content } from '../../../types'
import type { MicroCMSListResponse } from '../../cms'
import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/cloudflare'

export const indexLoader = async ({
  context,
}: LoaderFunctionArgs): Promise<
  TypedResponse<MicroCMSListResponse<Content>>
> => {
  const { CMS_API_KEY } = context.cloudflare.env
  const posts = await getPosts(client(CMS_API_KEY))

  return json({ ...posts })
}

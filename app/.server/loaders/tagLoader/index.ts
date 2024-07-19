import { json } from '@remix-run/cloudflare'

import { client, cmsUseCase } from '../../cms'

import type { Content } from '../../../types'
import type { MicroCMSListResponse } from '../../cms'
import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/cloudflare'

type LoaderResponse = Promise<
  TypedResponse<
    MicroCMSListResponse<Content> & {
      tagName: string | undefined
      tagSlug: string | undefined
    }
  >
>

export const tagLoader = async ({
  params,
  context,
}: LoaderFunctionArgs): LoaderResponse => {
  if (!params.tagId) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    })
  }

  const { CMS_API_KEY } = context.cloudflare.env
  const { posts, tagName, tagSlug } = await cmsUseCase.getPostsByTag(
    client(CMS_API_KEY),
    params.tagId
  )

  return json({ ...posts, tagName, tagSlug })
}

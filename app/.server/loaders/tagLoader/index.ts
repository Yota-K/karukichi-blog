import { json } from '@remix-run/cloudflare'

import { client, getPosts } from '../../cms'

import type { Content } from '../../../types'
import type { MicroCMSListResponse } from '../../cms'
import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/cloudflare'

type LoaderRespose = Promise<
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
}: LoaderFunctionArgs): LoaderRespose => {
  if (!params.tagId) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    })
  }

  const { CMS_API_KEY } = context.cloudflare.env
  const posts = await getPosts(client(CMS_API_KEY), {
    filters: `tag_field[contains]${params.tagId}`,
  })

  // TODO: ビジネスロジックなので、ページネーション実装する時に追加するサービス層に移動する
  const findTag = posts.contents[0].tag_field.find(
    (tag) => tag.id === params.tagId
  )
  const tagName = findTag?.name
  const tagSlug = findTag?.id

  return json({ ...posts, tagName, tagSlug })
}

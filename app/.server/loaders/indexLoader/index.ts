import { json } from '@remix-run/cloudflare'

import { client, cmsUseCase } from '../../cms'

import type { Content } from '../../../types'
import type { MicroCMSListResponse } from '../../cms'
import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/cloudflare'

export const indexLoader = async ({
  request,
  context,
}: LoaderFunctionArgs): Promise<
  TypedResponse<MicroCMSListResponse<Content>>
> => {
  const url = new URL(request.url)
  console.log(url)
  const pageQueryParams = url.searchParams.get('page')

  const { CMS_API_KEY } = context.cloudflare.env
  const posts = await cmsUseCase.getPosts(client(CMS_API_KEY), pageQueryParams)

  return json({ ...posts })
}

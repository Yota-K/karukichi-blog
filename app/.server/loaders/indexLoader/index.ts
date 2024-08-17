import { json } from '@remix-run/cloudflare';

import { client, cmsUseCase } from '../../cms';

import type { GetPostsDto, GetTagsDto } from '../../cms';
import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/cloudflare';

type LoaderResponse = Promise<TypedResponse<GetPostsDto & GetTagsDto>>;

export const indexLoader = async ({ request, context }: LoaderFunctionArgs): LoaderResponse => {
  const url = new URL(request.url);
  const pageQueryParams = url.searchParams.get('page');

  const { CMS_API_KEY } = context.cloudflare.env;
  const posts = await cmsUseCase.getPosts(client(CMS_API_KEY), pageQueryParams);
  const { tags } = await cmsUseCase.getTags(client(CMS_API_KEY));

  return json({ ...posts, tags });
};

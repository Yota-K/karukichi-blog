import { json } from '@remix-run/cloudflare';

import { client, cmsUseCase } from '../../cms';

import type { GetPostsByTagDto } from '../../cms';
import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/cloudflare';

type LoaderResponse = Promise<TypedResponse<GetPostsByTagDto>>;

export const tagRelatedArticleLoader = async ({ request, params, context }: LoaderFunctionArgs): LoaderResponse => {
  if (!params.tagId) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const url = new URL(request.url);
  const pageQueryParams = url.searchParams.get('page');

  const { CMS_API_KEY } = context.cloudflare.env;
  const posts = await cmsUseCase.getPostsByTag(client(CMS_API_KEY), params.tagId, pageQueryParams);

  if (!posts) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return json({
    ...posts,
    tagName: posts.tagName,
    tagSlug: posts.tagSlug,
    paginateNum: posts.paginateNum,
  });
};

import { defer } from '@remix-run/cloudflare';

import { client } from '../../cms';
import { cmsUseCase } from '../../usecase';

import type { GetPostsByTagDto } from '../../usecase';
import type { LoaderFunctionArgs, TypedDeferredData } from '@remix-run/cloudflare';

type LoaderResponse = Promise<
  TypedDeferredData<{
    contents: Promise<GetPostsByTagDto['contents']>;
    paginateNum: GetPostsByTagDto['paginateNum'];
    tagName: GetPostsByTagDto['tagName'];
    totalCount: GetPostsByTagDto['totalCount'];
  }>
>;

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

  return defer({
    contents: Promise.resolve(posts.contents),
    paginateNum: posts.paginateNum,
    tagName: posts.tagName,
    totalCount: posts.totalCount,
  });
};

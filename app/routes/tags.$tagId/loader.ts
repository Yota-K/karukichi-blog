import { client, cmsUsecase } from '../../.server';

import type { GetPostsByTagDto, GetTagsDto } from '../../.server';
import type { Route } from '../tags.$tagId/+types/route';

type LoaderResponse = Promise<{
  contents: Promise<GetPostsByTagDto['contents']>;
  paginateNum: GetPostsByTagDto['paginateNum'];
  tagName: GetPostsByTagDto['tagName'];
  totalCount: GetPostsByTagDto['totalCount'];
  tags: GetTagsDto['tags'];
}>;

export const loader = async ({ request, params, context }: Route.LoaderArgs): LoaderResponse => {
  if (!params.tagId) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const url = new URL(request.url);
  const pageQueryParams = url.searchParams.get('page');

  const { CMS_API_KEY } = context.cloudflare.env;
  const cmsClient = client(CMS_API_KEY);

  const [posts, tagsResult] = await Promise.all([
    cmsUsecase.getPostsByTag(cmsClient, params.tagId, pageQueryParams),
    cmsUsecase.getTags(cmsClient),
  ]);

  if (!posts) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return {
    contents: Promise.resolve(posts.contents),
    paginateNum: posts.paginateNum,
    tagName: posts.tagName,
    totalCount: posts.totalCount,
    tags: tagsResult.tags,
  };
};

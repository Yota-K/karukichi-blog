import { client, cmsUsecase } from '../../.server';

import type { GetPostsDto, GetTagsDto } from '../../.server';
import type { Route } from '../_index/+types/route';

type LoaderResponse = Promise<{
  contents: Promise<GetPostsDto['contents']>;
  totalCount: GetPostsDto['totalCount'];
  paginateNum: GetPostsDto['paginateNum'];
  tags: GetTagsDto['tags'];
}>;

export const loader = async ({ request, context }: Route.LoaderArgs): LoaderResponse => {
  const url = new URL(request.url);
  const pageQueryParams = url.searchParams.get('page');

  const { CMS_API_KEY } = context.cloudflare.env;
  const { contents, totalCount, paginateNum } = await cmsUsecase.getPosts(client(CMS_API_KEY), pageQueryParams);
  const { tags } = await cmsUsecase.getTags(client(CMS_API_KEY));

  return {
    contents: Promise.resolve(contents),
    totalCount,
    paginateNum,
    tags,
  };
};

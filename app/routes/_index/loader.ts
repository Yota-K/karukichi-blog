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
  const cmsClient = client(CMS_API_KEY);

  const [postsResult, tagsResult] = await Promise.all([
    cmsUsecase.getPosts(cmsClient, pageQueryParams),
    cmsUsecase.getTags(cmsClient),
  ]);

  return {
    contents: Promise.resolve(postsResult.contents),
    totalCount: postsResult.totalCount,
    paginateNum: postsResult.paginateNum,
    tags: tagsResult.tags,
  };
};

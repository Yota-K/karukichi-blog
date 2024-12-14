import { client } from '../../cms';
import { cmsUseCase } from '../../usecase';

import type { GetPostsDto, GetTagsDto } from '../../usecase';
import type { LoaderFunctionArgs } from 'react-router';

type LoaderResponse = Promise<{
  contents: Promise<GetPostsDto['contents']>;
  totalCount: GetPostsDto['totalCount'];
  paginateNum: GetPostsDto['paginateNum'];
  tags: GetTagsDto['tags'];
}>;

export const indexLoader = async ({ request, context }: LoaderFunctionArgs): LoaderResponse => {
  const url = new URL(request.url);
  const pageQueryParams = url.searchParams.get('page');

  const { CMS_API_KEY } = context.cloudflare.env;
  const { contents, totalCount, paginateNum } = await cmsUseCase.getPosts(client(CMS_API_KEY), pageQueryParams);
  const { tags } = await cmsUseCase.getTags(client(CMS_API_KEY));

  return {
    contents: Promise.resolve(contents),
    totalCount,
    paginateNum,
    tags,
  };
};

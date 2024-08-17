import { json } from '@remix-run/cloudflare';

import { client, cmsUseCase } from '../../cms';

import type { GetPostsDto, GetTagsDto } from '../../cms';
import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/cloudflare';

// postsはスプレッド構文で展開しているので、DTOの型定義からpostsだけ取り出して、paginateNumとtagsを追加する形でloaderの戻り値の型を定義している
type LoaderResponse = Promise<
  TypedResponse<
    GetPostsDto['posts'] & {
      paginateNum: GetPostsDto['paginateNum'];
      tags: GetTagsDto['tags'];
    }
  >
>;

export const indexLoader = async ({ request, context }: LoaderFunctionArgs): LoaderResponse => {
  const url = new URL(request.url);
  const pageQueryParams = url.searchParams.get('page');

  const { CMS_API_KEY } = context.cloudflare.env;
  const { posts, paginateNum } = await cmsUseCase.getPosts(client(CMS_API_KEY), pageQueryParams);
  const { tags } = await cmsUseCase.getTags(client(CMS_API_KEY));

  return json({ ...posts, paginateNum, tags });
};

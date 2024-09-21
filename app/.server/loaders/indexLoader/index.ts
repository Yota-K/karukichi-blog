import { defer } from '@remix-run/cloudflare';

import { client } from '../../cms';
import { cmsUseCase } from '../../usecase';

// import type { GetPostsDto, GetTagsDto } from '../../usecase';
import type { LoaderFunctionArgs } from '@remix-run/cloudflare';

// type LoaderResponse = Promise<TypedDeferredData<GetPostsDto & GetTagsDto>>;

export const indexLoader = async ({ request, context }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pageQueryParams = url.searchParams.get('page');

  const { CMS_API_KEY } = context.cloudflare.env;
  const posts = cmsUseCase.getPosts(client(CMS_API_KEY), pageQueryParams);
  const { tags } = await cmsUseCase.getTags(client(CMS_API_KEY));

  return defer({ posts, tags });
};

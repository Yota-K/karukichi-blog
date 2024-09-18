import { json } from '@remix-run/cloudflare';

import { client } from '../../cms';
import { cmsUseCase } from '../../usecase';

import type { FindPostDto } from '../../usecase';
import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/cloudflare';

type LoaderResponse = Promise<TypedResponse<FindPostDto>>;

export const articleDetailLoader = async ({ params, context }: LoaderFunctionArgs): LoaderResponse => {
  // https://remix.run/docs/en/main/guides/not-found#how-to-send-a-404
  if (!params.contentId) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const { CMS_API_KEY, RESPONSE_CACHE_KV } = context.cloudflare.env;

  // TODO: 後でリファクタリングする
  const cacheKey = `post:${params.contentId}`;
  const { status, content, toc } = await cmsUseCase.findPost(client(CMS_API_KEY), params.contentId);
  await RESPONSE_CACHE_KV.put(cacheKey, JSON.stringify({ status, content, toc }));

  if (status === 404) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return json({ status, content, toc });
};

import { json } from '@remix-run/cloudflare';

import { cmsUseCase } from '../../cms';

import type { FindPostDto } from '../../cms';
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

  const { CMS_API_KEY } = context.cloudflare.env;
  const { status, content, toc } = await cmsUseCase.findPost(CMS_API_KEY, params.contentId);

  if (status === 404) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return json({ status, content, toc });
};

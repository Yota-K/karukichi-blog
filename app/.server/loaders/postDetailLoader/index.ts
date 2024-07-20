import { json } from '@remix-run/cloudflare';

import { client, cmsUseCase } from '../../cms';

import type { Content } from '../../../types';
import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/cloudflare';

export const postDetailLoader = async ({ params, context }: LoaderFunctionArgs): Promise<TypedResponse<Content>> => {
  // https://remix.run/docs/en/main/guides/not-found#how-to-send-a-404
  if (!params.contentId) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const { CMS_API_KEY } = context.cloudflare.env;
  const post = await cmsUseCase.findPost(client(CMS_API_KEY), params.contentId);

  return json({ ...post });
};

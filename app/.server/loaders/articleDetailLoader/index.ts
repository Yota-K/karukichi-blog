import { json } from '@remix-run/cloudflare';

import { client } from '../../cms';
import { cmsUseCase } from '../../usecase';

import type { FindPostDto } from '../../usecase';
import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/cloudflare';

type LoaderResponse = Promise<TypedResponse<FindPostDto>>;

const checkHost = (host: string | null) => {
  return Boolean(host?.includes('localhost:5173'));
};

export const articleDetailLoader = async ({ params, context, request }: LoaderFunctionArgs): LoaderResponse => {
  // https://remix.run/docs/en/main/guides/not-found#how-to-send-a-404
  if (!params.contentId) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const { CMS_API_KEY, RESPONSE_CACHE_KV } = context.cloudflare.env;

  // kvをremixのdevサーバで動かすと、kvからデータを取得するときにエラーで落ちるので、アクセスした URI とポートをみてローカル環境かどうか判断する
  const isDev = checkHost(request.headers.get('host'));
  const { status, content, toc } = await cmsUseCase.findPost(
    client(CMS_API_KEY),
    params.contentId,
    RESPONSE_CACHE_KV,
    isDev,
  );

  if (status === 404) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return json({ status, content, toc });
};

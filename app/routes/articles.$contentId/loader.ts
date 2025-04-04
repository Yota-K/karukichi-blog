import { data } from 'react-router';

import { checkHost, client, cmsUsecase } from '../../.server';

import type { DataWithResponseInit, FindPostDto } from '../../.server';
import type { Route } from '../articles.$contentId/+types/route';

type LoaderResponse = Promise<DataWithResponseInit<FindPostDto>>;

export const loader = async ({ params, context, request }: Route.LoaderArgs): LoaderResponse => {
  const contentId = params.contentId;

  // https://remix.run/docs/en/main/guides/not-found#how-to-send-a-404
  if (!contentId) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const { CMS_API_KEY, RESPONSE_CACHE_KV } = context.cloudflare.env;

  const url = new URL(request.url);
  const draftKey = url.searchParams.get('draftKey');

  // kvをremixのdevサーバで動かすと、kvからデータを取得するときにエラーで落ちるので、アクセスした URI とポートをみてローカル環境かどうか判断する
  const isDev = checkHost(request.headers.get('host'));
  const { status, content, toc } = await cmsUsecase.findPost(
    client(CMS_API_KEY),
    contentId,
    draftKey,
    RESPONSE_CACHE_KV,
    isDev,
  );

  if (status === 404) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return data(
    { status, content, toc },
    {
      // draftKeyがクエリパラメータに指定されている場合はキャッシュを無効化する
      headers: draftKey ? { 'Cache-Control': 'no-store, max-age=0, s-maxage=0' } : undefined,
    },
  );
};

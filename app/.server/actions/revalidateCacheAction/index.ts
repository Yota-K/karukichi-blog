import { json } from '@remix-run/cloudflare';

import { kvUseCase } from '../../usecase';

import type { ActionFunctionArgs } from '@remix-run/cloudflare';

export const revalidateCacheAction = async ({ request, context }: ActionFunctionArgs) => {
  if (request.method !== 'POST') {
    return json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  const { REVALIDATE_CACHE_API_KEY, RESPONSE_CACHE_KV } = context.cloudflare.env;

  // note: WebhookリクエストがmicroCMSからのものであることを検証する処理も実行したいが、
  // うまくいかないので、api keyのチェックのみに留めている
  // https://document.microcms.io/manual/webhook-setting#hb2d39bd6cc
  if (REVALIDATE_CACHE_API_KEY !== request.headers.get('X-API-KEY')) {
    return json({ message: 'Unauthorized' }, { status: 401 });
  }

  const bodyText = await request.text();
  const postId = await kvUseCase.revalidateCache(RESPONSE_CACHE_KV, bodyText);

  if (!postId) {
    return json({ message: 'Invalid request' }, { status: 400 });
  }

  return json({ message: 'Cache deleted' }, { status: 200 });
};

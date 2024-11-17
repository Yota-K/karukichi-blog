import { json } from '@remix-run/cloudflare';

import { cloudFlareCacheUseCase, kvUseCase } from '../../usecase';

import type { ActionFunctionArgs, TypedResponse } from '@remix-run/cloudflare';

type ActionResponse = Promise<TypedResponse<{ success: boolean; message: string }>>;

// NOTE: kvとCloudFlareのCDNキャッシュを削除する処理を実行しているが、それぞれの関連性はないため、
// KVのキャッシュは削除できたが、CloudFlareのCDNキャッシュが削除できなかったみたいなケースは許容する

export const revalidateCacheAction = async ({ request, context }: ActionFunctionArgs): ActionResponse => {
  if (request.method !== 'POST') {
    return json({ success: false, message: 'Method Not Allowed' }, { status: 405 });
  }

  const { REVALIDATE_CACHE_API_KEY, RESPONSE_CACHE_KV, CLOUD_FLARE_ZONE_ID, CLOUD_FLARE_API_TOKEN } =
    context.cloudflare.env;

  // note: WebhookリクエストがmicroCMSからのものであることを検証する処理も実行したいが、
  // うまくいかないので、api keyのチェックのみに留めている
  // https://document.microcms.io/manual/webhook-setting#hb2d39bd6cc
  if (REVALIDATE_CACHE_API_KEY !== request.headers.get('X-API-KEY')) {
    return json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const bodyText = await request.text();
  //eslint-disable-next-line no-console
  console.info('bodyText', bodyText);

  const postId = await kvUseCase.revalidateCache(RESPONSE_CACHE_KV, bodyText);

  if (!postId) {
    return json(
      {
        success: false,
        message: 'Failed delete kv cache.',
      },
      { status: 400 },
    );
  }

  const purgeCacheResult = await cloudFlareCacheUseCase.purgeCdnCache(
    CLOUD_FLARE_API_TOKEN,
    CLOUD_FLARE_ZONE_ID,
    `articles/${postId}`,
  );
  if (!purgeCacheResult) {
    return json(
      {
        success: false,
        message: 'Failed purge CDN cache.',
      },
      { status: 400 },
    );
  }

  return json({ success: true, message: 'Cache deleted' }, { status: 200 });
};

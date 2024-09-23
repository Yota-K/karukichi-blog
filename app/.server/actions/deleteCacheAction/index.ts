import { json } from '@remix-run/cloudflare';

import type { ActionFunctionArgs } from '@remix-run/cloudflare';

export const deleteCacheAction = async ({ params, request }: ActionFunctionArgs) => {
  if (request.method !== 'DELETE') {
    return json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  const contentId = params.contentId;

  if (!contentId) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  // eslint-disable-next-line no-console
  console.info('contentId', contentId);

  // TODO: 処理の流れ
  // 1. リクエストボディからapi実行用のtokenを取得
  // 2. api実行用のtokenのチェックを行う
  // 3. 正常な場合は、更新対象の記事情報をmicroCMSから取得する
  // 4. 取得した記事情報のcontentIdを使ってKVからキャッシュを削除する

  return json({ message: 'Cache deleted' });
};

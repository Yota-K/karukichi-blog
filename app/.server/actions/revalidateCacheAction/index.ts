import { createHmac, timingSafeEqual } from 'crypto';

import { json } from '@remix-run/cloudflare';
import { z } from 'zod';

import type { ActionFunctionArgs } from '@remix-run/cloudflare';

const tagFieldSchema = z.object({
  id: z.string(),
  createdAt: z.string(), // DateTime形式を使用している場合は、カスタムバリデーションを追加できます
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string().optional(),
  name: z.string(),
  posts: z.array(
    z.object({
      id: z.string(),
    }),
  ),
});

const categoryFieldSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  revisedAt: z.string(),
  name: z.string(),
  posts: z.array(
    z.object({
      id: z.string(),
    }),
  ),
});
const blogContentSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string(),
  title: z.string(),
  type: z.array(z.string()),
  body: z.string(),
  category_field: categoryFieldSchema,
  tag_field: z.array(tagFieldSchema),
});
const blogStatusSchema = z.object({
  id: z.string(),
  status: z.array(z.string()),
  draftKey: z.string().nullable(),
  publishValue: blogContentSchema,
  draftValue: z.null(),
});
const contentsSchema = z.object({
  old: blogStatusSchema,
  new: blogStatusSchema,
});

const blogEditSchema = z.object({
  service: z.string(),
  api: z.string(),
  id: z.string(),
  type: z.literal('edit'),
  contents: contentsSchema,
});

export const revalidateCacheAction = async ({ request, context }: ActionFunctionArgs) => {
  if (request.method !== 'POST') {
    return json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  // note: WebhookリクエストがmicroCMSからのものであることを検証する処理も実行したいが、
  // うまくいかないので、api keyのチェックのみに留めている
  // https://document.microcms.io/manual/webhook-setting#hb2d39bd6cc
  const apiKey = context.cloudflare.env.REVALIDATE_CACHE_API_KEY;
  if (apiKey !== request.headers.get('X-API-KEY')) {
    return json({ message: 'Unauthorized' }, { status: 401 });
  }

  // microCMSからのリクエストかどうか検証する

  // TODO: この辺の処理はusecase層に移動する
  const bodyText = await request.text();
  const convertToObj = JSON.parse(bodyText);
  const parsedBody = blogEditSchema.safeParse(convertToObj);

  if (!parsedBody.success) {
    return json({ message: 'Bad Request' }, { status: 400 });
  }

  // eslint-disable-next-line no-console
  console.info('parsedBody', parsedBody);
  // const { id: oldPostId } = parsedBody.data.contents.old;

  // TODO: 処理の流れ
  // 3. 取得した記事情報のcontentIdを使ってKVからキャッシュを削除する

  return json({ message: 'Cache deleted' });
};

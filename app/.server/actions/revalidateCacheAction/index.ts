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

export const revalidateCacheAction = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== 'POST') {
    return json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  const bodyText = await request.text();
  const convertToObj = JSON.parse(bodyText);
  const parsedBody = blogEditSchema.safeParse(convertToObj);

  if (!parsedBody.success) {
    return json({ message: 'Bad Request' }, { status: 400 });
  }

  // eslint-disable-next-line no-console
  console.log('parsedBody', parsedBody);

  // const { id: oldPostId } = parsedBody.data.contents.old;

  // console.log('oldPostId', oldPostId);

  // TODO: 処理の流れ
  // 1. microCMSからのリクエストかどうか検証する
  // 2. 正常な場合は、更新対象の記事情報をmicroCMSから取得する
  // 3. 取得した記事情報のcontentIdを使ってKVからキャッシュを削除する

  return json({ message: 'Cache deleted' });
};

import { z } from 'zod';

// TODO: 後で共通化したい
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
  type: z.array(z.union([z.literal('cms'), z.literal('qiita')])),
  body: z.string(),
  category_field: categoryFieldSchema,
  tag_field: z.array(tagFieldSchema),
});
const blogStatusSchema = z
  .object({
    id: z.string(),
    status: z.array(z.string()),
    draftKey: z.string().nullable(),
    publishValue: blogContentSchema,
    draftValue: z.null(),
  })
  .nullable();
const contentsSchema = z
  .object({
    old: blogStatusSchema,
    new: blogStatusSchema,
  })
  .nullable();

export const schema = z.object({
  service: z.string(),
  api: z.string(),
  id: z.string().nullable(),
  type: z.union([z.literal('new'), z.literal('edit'), z.literal('delete')]),
  contents: contentsSchema,
});

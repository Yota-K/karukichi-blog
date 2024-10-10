import { z } from 'zod';

const taxonomySchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().optional(),
  revisedAt: z.string().optional(),
  name: z.string(),
  posts: z.array(
    z.object({
      id: z.string(),
    }),
  ),
});

/**
 * コンテンツのスキーマ
 */
export const contentSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().optional(),
  revisedAt: z.string(),
  title: z.string(),
  type: z.array(z.union([z.literal('cms'), z.literal('qiita')])),
  body: z.string(),
  // caregoryは使用しないので不要になったタイミングで消す
  // category_field: taxonomySchema,
  tag_field: z.array(taxonomySchema),
});

const blogStatusSchema = z
  .object({
    id: z.string(),
    status: z.array(z.string()),
    draftKey: z.string().optional(),
    publishValue: contentSchema,
    draftValue: z.null(),
  })
  .optional();

/**
 * webhookの実行時のリクエストボディに含まれるコンテンツのスキーマ
 */
export const contentSchemaForWebhook = z.object({
  service: z.string(),
  api: z.string(),
  id: z.string().optional(),
  type: z.union([z.literal('new'), z.literal('edit'), z.literal('delete')]),
  contents: z
    .object({
      old: blogStatusSchema,
      new: blogStatusSchema,
    })
    .optional(),
});

export type Content = z.infer<typeof contentSchema>;

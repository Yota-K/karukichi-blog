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
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().optional(),
  revisedAt: z.string().optional(),
  title: z.string(),
  body: z.string(),
  type: z.array(z.union([z.literal('cms'), z.literal('qiita'), z.literal('note')])),
  description: z.string().optional(),
  tag_field: z.array(taxonomySchema),
});

const blogStatusSchema = z
  .object({
    id: z.string(),
    status: z.array(z.string()),
    draftKey: z.string().nullable(),
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

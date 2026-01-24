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

const contentType = z.array(z.union([z.literal('cms'), z.literal('qiita'), z.literal('note')]));

/**
 * 記事一覧用のスキーマ（body, descriptionを含まない）
 */
export const contentListItemSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().optional(),
  revisedAt: z.string().optional(),
  title: z.string(),
  type: contentType,
  tag_field: z.array(taxonomySchema),
  external_url: z.string().optional(),
});

/**
 * 記事詳細用のスキーマ（body, descriptionを含む）
 */
export const contentSchema = contentListItemSchema.extend({
  body: z.string().optional(),
  description: z.string().optional(),
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

export type ContentListItem = z.infer<typeof contentListItemSchema>;
export type Content = z.infer<typeof contentSchema>;

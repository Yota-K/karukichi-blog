import { z } from 'zod';

// TODO: z.inferで、スキーマから型定義を生成するみたいな実装にできると良さそう
export const contentSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string(),
  title: z.string(),
  body: z.string(),
  type: z.array(z.union([z.literal('cms'), z.literal('qiita')])),
  description: z.string(),
  tag_field: z.array(
    z.object({
      id: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      name: z.string(),
      posts: z.array(
        z.object({
          id: z.string(),
        }),
      ),
    }),
  ),
});

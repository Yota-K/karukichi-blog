import { json } from '@remix-run/cloudflare';
import { z } from 'zod';

import { config } from '../../config';

import { contentSchema } from './schema';

import type { ClientType } from './client';
import type { CustomErrorResponse, PickMicroCMSQueries, TagResponse } from './type';
import type { Content, MicroCMSListResponse } from '../../types';

const endpoints = {
  blogs: 'blogs',
  tags: 'tags',
} as const;

export const cmsApi = {
  /**
   * 記事一覧を取得
   */
  getPosts: async (client: ClientType, queries?: PickMicroCMSQueries): Promise<MicroCMSListResponse<Content>> => {
    const data = await client.getList<Content>({
      endpoint: endpoints.blogs,
      queries: {
        offset: queries?.offset ?? 0,
        limit: queries?.limit ?? config.paginateLimit,
        filters: queries?.filters ?? undefined,
      },
    });

    return data;
  },

  /**
   * 特定の記事を取得
   */
  findPost: async (client: ClientType, contentId: string): Promise<Content | CustomErrorResponse> => {
    return await client
      .get<Content>({
        endpoint: endpoints.blogs,
        contentId,
      })
      .then((res) => {
        // zodを使ってバリデーションチェックを行うことで、型の安全性と、厳密なエラーハンドリングを実現できる
        contentSchema.parse(res);
        return res;
      })
      .catch((error: unknown) => {
        // データの欠損など、zodのバリデーションエラーが発生した場合は500エラー扱いにする
        if (error instanceof z.ZodError) {
          throw json({
            status: 500,
            message: error.errors.map((e) => e.message).join(', '),
          });
        }

        return {
          status: 404,
          message: 'Content not found',
        };
      });
  },

  /**
   * タグ一覧を取得
   */
  getTags: async (client: ClientType): Promise<MicroCMSListResponse<TagResponse>> => {
    const data = await client.getList<TagResponse>({
      endpoint: endpoints.tags,
      queries: {
        fields: 'id,name',
        limit: 100,
      },
    });

    return data;
  },
};

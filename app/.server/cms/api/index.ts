import { config } from '../../../config';
import { serviceDomain } from '../client';

import type { Content, MicroCMSListResponse } from '../../../types';
import type { ClientType } from '../client';
import type { FindPostResponse, TagResponse } from '../type';
import type { MicroCMSQueries } from 'microcms-js-sdk';

type PickMicroCMSQueries = Pick<MicroCMSQueries, 'offset' | 'limit' | 'filters' | 'fields'>;

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
  findPost: async (apiKey: string, contentId: string): Promise<FindPostResponse> => {
    // microCMSのsdkだと、ステータスコードが取得できず、404エラーのハンドリングができないため、sdkではなくfetchを使用している
    // https://github.com/microcmsio/microcms-js-sdk/issues/47
    try {
      const res = await fetch(`https://${serviceDomain}.microcms.io/api/v1/blogs/${contentId}`, {
        headers: { 'X-API-KEY': apiKey },
      });

      if (!res.ok) {
        return {
          status: res.status,
          content: undefined,
        };
      }

      const data = (await res.json()) as Content;

      return {
        status: res.status,
        content: data,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data');
    }
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

import { Config } from '../../config';

import type { ClientType } from './client';
import type { Content, TaxonomyField } from '../../types';
import type { MicroCMSQueries } from 'microcms-js-sdk';

export const endpoints = {
  blogs: 'blogs',
  category: 'category',
  tags: 'tags',
} as const;

type PickMicroCMSQueries = Pick<MicroCMSQueries, 'offset' | 'limit' | 'filters' | 'fields'>;

export const cmsApi = {
  /**
   * 記事一覧を取得
   */
  getPosts: async (client: ClientType, queries?: PickMicroCMSQueries) => {
    const data = await client.getList<Content>({
      endpoint: endpoints.blogs,
      queries: {
        offset: queries?.offset ?? 0,
        limit: queries?.limit ?? Config.paginateLimit,
        filters: queries?.filters ?? undefined,
      },
    });

    return data;
  },

  /**
   * 特定の記事を取得
   */
  findPost: async (client: ClientType, contentId: string) => {
    const data = await client.get<Content>({
      endpoint: endpoints.blogs,
      contentId,
    });

    return data;
  },

  /**
   * タグ一覧を取得
   */
  getTags: async (client: ClientType) => {
    const data = await client.getList<Pick<TaxonomyField, 'id' | 'name'>>({
      endpoint: endpoints.tags,
      queries: {
        fields: 'id,name',
        limit: 100,
      },
    });

    return data;
  },
};

import { config } from '../../../config';

import type { ClientType, Content, MicroCMSListResponse, PickMicroCMSQueries, TagResponse } from './type';

export const endpoints = {
  blogs: 'blogs',
  category: 'category',
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
  findPost: async (client: ClientType, contentId: string): Promise<Content> => {
    const data = await client.get<Content>({
      endpoint: endpoints.blogs,
      contentId,
    });

    return data;
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

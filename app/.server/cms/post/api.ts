import { endpoints } from '../endpoints'

import type { Content } from '../../../types'
import type { ClientType } from '../client'
import type { MicroCMSQueries } from 'microcms-js-sdk'

type PickMicroCMSQueries = Pick<MicroCMSQueries, 'offset' | 'limit' | 'filters'>

// 1ページあたりの取得件数は10にしておく。
export const paginateLimit = 10 as const

export const cmsApi = {
  /**
   * 記事一覧を取得
   */
  getPosts: async (client: ClientType, queries?: PickMicroCMSQueries) => {
    const data = await client.getList<Content>({
      endpoint: endpoints.blogs,
      queries: {
        offset: queries?.offset ?? 0,
        limit: queries?.limit ?? paginateLimit,
        filters: queries?.filters ?? undefined,
      },
    })

    return data
  },

  /**
   * 特定の記事を取得
   */
  findPost: async (client: ClientType, contentId: string) => {
    const data = await client.get<Content>({
      endpoint: endpoints.blogs,
      contentId,
    })

    return data
  },
}

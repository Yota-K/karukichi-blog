import { client, endpoints } from '../client'

import type { Content } from '../../../types'
import type { MicroCMSQueries } from 'microcms-js-sdk'

type PickMicroCMSQueries = Pick<MicroCMSQueries, 'offset' | 'limit' | 'filters'>

/**
 * 記事一覧を表示するために必要な情報を取得
 * @param offset 何件目から取得するかの指定。初期値は0。
 * @param limit 取得件数の指定。初期値は5。
 * @param filters? 取得条件の指定
 */
export const getPosts = async (queries?: PickMicroCMSQueries) => {
  const data = await client.getList<Content>({
    endpoint: endpoints.blogs,
    queries: {
      offset: queries?.offset ?? 0,
      limit: queries?.limit ?? 5,
      filters: queries?.filters ?? undefined,
    },
  })

  return data
}

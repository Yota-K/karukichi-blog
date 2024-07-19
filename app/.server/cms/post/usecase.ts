import { cmsApi, paginateLimit } from './api'
import { paginateSchema } from './schema'

import type { ClientType } from '../client'

export const cmsUseCase = {
  /**
   * 記事一覧を取得
   */
  getPosts: async (client: ClientType, pageQuery: string | null) => {
    const paginateNum = paginateSchema.safeParse(pageQuery)

    if (paginateNum.success) {
      const offset = paginateNum.data * paginateLimit - paginateLimit
      return cmsApi.getPosts(client, {
        offset,
      })
    }

    return cmsApi.getPosts(client)
  },

  /**
   * タグに関連する記事一覧を取得
   */
  getPostsByTag: async (client: ClientType, tagId: string) => {
    const posts = await cmsApi.getPosts(client, {
      filters: `tag_field[contains]${tagId}`,
    })
    const findTag = posts.contents[0].tag_field.find((tag) => tag.id === tagId)
    const tagName = findTag?.name
    const tagSlug = findTag?.id

    return {
      posts,
      tagName,
      tagSlug,
    }
  },

  /**
   * 特定の記事を取得
   */
  findPost: async (client: ClientType, contentId: string) => {
    return cmsApi.findPost(client, contentId)
  },
}

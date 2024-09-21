import type { Content } from '../../../types';

const CACHE_KEYS = {
  postDetail: (contentId: string) => `post:${contentId}`,
};

// TODO: 一旦は記事詳細のキャッシュのみkvに保存するようにしているが、microCMSに対するapiリクエストがが増えてきたら、
// 記事一覧やタグページなどのキャッシュをkvに保存することを検討する

export const kvRepository = {
  /**
   * 特定の記事のキャッシュをKVから取得
   */
  getPostDetailCache: async <T>(kv: KVNamespace<string>, contentId: string) => {
    const cachedResponse = await kv.get(CACHE_KEYS.postDetail(contentId));
    return cachedResponse ? (JSON.parse(cachedResponse) as T) : null;
  },

  /**
   * 特定の記事のキャッシュをKVに保存
   */
  savePostDetailCache: async (kv: KVNamespace<string>, contentId: string, content: Content) => {
    return await kv.put(CACHE_KEYS.postDetail(contentId), JSON.stringify(content));
  },
};

import type { Content } from '../../../schema';
import type { Toc } from '../../../types';

// TODO: 一旦は記事詳細のキャッシュのみkvに保存するようにしているが、microCMSに対するapiリクエストが増えてきたら、
// 記事一覧やタグページなどのキャッシュをkvに保存することを検討する
const CACHE_KEYS = {
  postDetail: (contentId: string) => `post:${contentId}`,
};

export type PostDetailCache = {
  content: Content;
  toc: Toc[];
};

export const cloudFlareKvRepository = {
  /**
   * 特定の記事のキャッシュをKVから取得
   */
  getPostDetailCache: async (kv: KVNamespace<string>, contentId: string): Promise<PostDetailCache | null> => {
    const cachedResponse = await kv.get(CACHE_KEYS.postDetail(contentId));
    return cachedResponse ? (JSON.parse(cachedResponse) as PostDetailCache) : null;
  },

  /**
   * 特定の記事のキャッシュをKVに保存（tocを含む）
   */
  savePostDetailCache: async (kv: KVNamespace<string>, contentId: string, content: Content, toc: Toc[]) => {
    const cache: PostDetailCache = { content, toc };
    return await kv.put(CACHE_KEYS.postDetail(contentId), JSON.stringify(cache));
  },

  /**
   * 特定の記事のキャッシュを削除
   */
  deletePostDetailCache: async (kv: KVNamespace<string>, contentId: string) => {
    return await kv.delete(CACHE_KEYS.postDetail(contentId));
  },
};

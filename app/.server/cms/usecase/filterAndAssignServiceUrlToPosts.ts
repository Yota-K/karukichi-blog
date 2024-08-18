import { anchorTagParser } from '../../htmlParser';
import { urlSchema } from '../schema';

import type { Content } from '../../../types';
import type { MicroCMSListResponse } from '../type';

/**
 * 投稿タイプによって記事をフィルタリングする処理
 * 投稿タイプがcms以外の場合はサービスのURLを取得してidに設定する
 *
 * 投稿タイプ: type
 * - cms: 自分のブログの記事
 * - qiita: Qiitaの記事
 */
export const filterAndAssignServiceUrlToPosts = (posts: MicroCMSListResponse<Content>): MicroCMSListResponse<Content> => {
  const filterPostsByContentType = posts.contents
    .filter((post) => {
      return post.type.includes('qiita');
    })
    .map((post) => {
      const serviceUrl = urlSchema.safeParse(anchorTagParser(post.body));
      if (serviceUrl.success) {
        return {
          ...post,
          id: serviceUrl.data,
        };
      }
      return {
        ...post,
        id: undefined,
      };
    });

  const filterPostsWithId = filterPostsByContentType.filter((post) => post.id !== undefined);

  // 重複を削除
  const uniqueContents = Array.from(
    new Map([...posts.contents, ...filterPostsWithId].map((content) => [content.title, content])).values(),
  );

  return {
    ...posts,
    contents: uniqueContents,
  };
};

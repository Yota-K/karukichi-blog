import { urlSchema } from '../../cms';
import { anchorTagParser } from '../../htmlParser';

import type { Content, MicroCMSListResponse } from '../../../types';

/**
 * 投稿タイプによって記事をフィルタリングする処理
 * 投稿タイプがcms以外の場合はサービスのURLを取得してidに設定する
 *
 * 投稿タイプ: type
 * - cms: 自分のブログの記事
 * - qiita: Qiitaの記事
 */
export const filterAndAssignServiceUrlToPosts = (
  posts: MicroCMSListResponse<Content>,
): MicroCMSListResponse<Content> => {
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
      };
    });

  const filterPostsWithId = filterPostsByContentType.filter((post) => post.id !== undefined);

  // 記事一覧で取得するデータ量が多いので、MAPで重複を削除している
  // 一覧で取得する情報量をもっと限定できれば、filterの方が良いので、取得するデータを最低限に絞った時にfilterに書き換える
  const uniqueContents = Array.from(
    new Map([...posts.contents, ...filterPostsWithId].map((content) => [content.title, content])).values(),
  );

  return {
    ...posts,
    contents: uniqueContents,
  };
};

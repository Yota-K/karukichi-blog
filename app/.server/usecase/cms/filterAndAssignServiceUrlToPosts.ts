import type { ContentListItem } from '../../../schema';
import type { MicroCMSListResponse } from 'microcms-js-sdk';

/**
 * 投稿タイプによって記事のidを設定する処理
 * 投稿タイプがcms以外の場合はexternal_urlをidに設定する
 *
 * 投稿タイプ: type
 * - cms: 自分のブログの記事
 * - qiita: Qiitaの記事
 * - note: noteの記事
 */
export const filterAndAssignServiceUrlToPosts = (
  posts: MicroCMSListResponse<ContentListItem>,
): MicroCMSListResponse<ContentListItem> => {
  const contents = posts.contents.map((post) => {
    const isExternalService = post.type.some((type) => type === 'qiita' || type === 'note');

    if (isExternalService && post.external_url) {
      return {
        ...post,
        id: post.external_url,
      };
    }

    return post;
  });

  return {
    ...posts,
    contents,
  };
};

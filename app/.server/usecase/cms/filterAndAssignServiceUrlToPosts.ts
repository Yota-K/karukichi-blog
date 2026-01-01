import { urlSchema } from "./schema";

import type { Content } from "../../../schema";
import type { MicroCMSListResponse } from "microcms-js-sdk";

/**
 * htmlからaタグのhrefを取得する
 * NOTE: 正規表現を使用して高速に抽出する（cheerioを使わない）
 */
export const anchorTagParser = (body: string): string | undefined => {
  // <a>タグのhref属性を抽出する正規表現
  // href="..." または href='...' の形式に対応
  // 最初の<a>タグのhrefを取得
  // パターン説明:
  // - <a[^>]* : <a>タグの開始から、>以外の文字を0文字以上
  // - href\s*=\s* : href属性（前後のスペースは任意）
  // - (["']) : 引用符（シングルまたはダブル）をキャプチャ
  // - ([^\1]*?) : 引用符以外の文字を非貪欲マッチでキャプチャ
  // - \1 : 最初の引用符と同じ種類の引用符で閉じる
  const match = body.match(/<a[^>]*href\s*=\s*(["'])(.*?)\1/i);
  return match ? match[2] : undefined;
};

/**
 * 投稿タイプによって記事をフィルタリングする処理
 * 投稿タイプがcms以外の場合はサービスのURLを取得してidに設定する
 *
 * 投稿タイプ: type
 * - cms: 自分のブログの記事
 * - qiita: Qiitaの記事
 * - note: noteの記事
 */
export const filterAndAssignServiceUrlToPosts = (
  posts: MicroCMSListResponse<Content>,
): MicroCMSListResponse<Content> => {
  const filterPostsByContentType = posts.contents
    .filter((post) => {
      return post.type.some((type) => type === "qiita" || type === "note");
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

  const filterPostsWithId = filterPostsByContentType.filter(
    (post) => post.id !== undefined,
  );

  // 記事一覧で取得するデータ量が多いので、MAPで重複を削除している
  // 一覧で取得する情報量をもっと限定できれば、filterの方が良いので、取得するデータを最低限に絞った時にfilterに書き換える
  const uniqueContents = Array.from(
    new Map(
      [...posts.contents, ...filterPostsWithId].map((content) => [
        content.title,
        content,
      ]),
    ).values(),
  );

  return {
    ...posts,
    contents: uniqueContents,
  };
};

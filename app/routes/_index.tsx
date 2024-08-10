import { useLoaderData } from '@remix-run/react';

import { indexLoader as loader } from '../.server';
import { ArticleListPage } from '../page';

import type { HeadersFunction } from '@remix-run/cloudflare';

export const headers: HeadersFunction = () => {
  return {
    // - レスポンスは7日間（604800 秒間）は新鮮。
    // - 7日間経過したら、そこから 360s は、古いキャッシュを参照するが、バックグラウンドでfetchを行い、キャッシュを更新して、サーバから新しいリソースを取得できたら、キャッシュを更新する。
    // - 7日を過ぎると古くなるが、サーバーがエラーでレスポンスを返した場合はさらに1日（86400 秒間）利用できる。
    'Cache-Control': 'max-age=0, s-maxage=604800, stale-while-revalidate=360, stale-if-error=86400',
  };
};

export { loader };

export default function Page() {
  const { contents, totalCount, paginateNum, tags } = useLoaderData<typeof loader>();
  return <ArticleListPage contents={contents} paginateNum={paginateNum} totalCount={totalCount} tags={tags} />;
}

import { useLoaderData } from 'react-router';

import { indexLoader as loader } from '../.server';
import { ArticleListPage } from '../page';

import type { HeadersFunction } from 'react-router';

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'public, max-age=180, s-maxage=180, stale-while-revalidate=180, stale-if-error=180',
  };
};

export { loader };

export default function Page() {
  const { contents, totalCount, paginateNum, tags } = useLoaderData<typeof loader>();
  return <ArticleListPage contents={contents} paginateNum={paginateNum} totalCount={totalCount} tags={tags.contents} />;
}

import { useLoaderData } from 'react-router';

import { loader } from './loader';
import { ArticleListPage } from './page';

import type { HeadersFunction } from 'react-router';

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=60',
  };
};

export { loader };

export default function Page() {
  const { contents, totalCount, paginateNum, tags } = useLoaderData<typeof loader>();
  return <ArticleListPage contents={contents} paginateNum={paginateNum} totalCount={totalCount} tags={tags.contents} />;
}

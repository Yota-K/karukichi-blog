import { useLoaderData } from 'react-router';

import { tagRelatedArticleLoader as loader } from '../.server';
import { config } from '../config';
import { TagRelatedArticleListPage } from '../page';

import type { HeadersFunction, MetaFunction } from 'react-router';

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'public, max-age=180, s-maxage=180, stale-while-revalidate=180, stale-if-error=180',
  };
};

export { loader };

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `${data?.tagName} | ${config.siteTitle}` }];
};

export default function Page() {
  const { contents, tagName, totalCount, paginateNum, tags } = useLoaderData<typeof loader>();
  return (
    <TagRelatedArticleListPage
      contents={contents}
      tagName={tagName}
      totalCount={totalCount}
      paginateNum={paginateNum}
      tags={tags.contents}
    />
  );
}

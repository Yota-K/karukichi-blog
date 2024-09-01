import { useLoaderData } from '@remix-run/react';

import { tagRelatedArticleLoader as loader } from '../.server';
import { config } from '../config';
import { TagRelatedArticleListPage } from '../page';

import type { HeadersFunction, MetaFunction } from '@remix-run/cloudflare';

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'max-age=0, s-maxage=604800, stale-while-revalidate=360, stale-if-error=86400',
  };
};

export { loader };

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `${data?.tagName} | ${config.siteTitle}` }];
};

export default function Page() {
  const { contents, tagName, totalCount, paginateNum } = useLoaderData<typeof loader>();
  return (
    <TagRelatedArticleListPage
      contents={contents}
      tagName={tagName}
      totalCount={totalCount}
      paginateNum={paginateNum}
    />
  );
}

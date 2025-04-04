import { useLoaderData } from 'react-router';

import { config } from '../../config';
import { TagRelatedArticleListPage } from '../../page';

import { loader } from './loader';

import type { Route } from '../tags.$tagId/+types/route';
import type { HeadersFunction } from 'react-router';

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'public, max-age=0, s-maxage=604800, stale-if-error=604800',
  };
};

export { loader };

export const meta: Route.MetaFunction = ({ data }) => {
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

import { Await } from '@remix-run/react';
import { Suspense } from 'react';

import { Heading, Pagination, Skeleton } from '../components';
import { PostList } from '../features';

import type { ContentList } from '../types';
import type { SerializeFrom } from '@remix-run/cloudflare';
import type { ComponentProps } from 'react';

type Props = {
  contents: Promise<SerializeFrom<ContentList['contents']>>;
  tagName?: string;
  paginateNum: ComponentProps<typeof Pagination>['paginateNum'];
  totalCount: ComponentProps<typeof Pagination>['totalCount'];
};

export const TagRelatedArticleListPage = ({ contents, tagName, paginateNum, totalCount }: Props) => {
  return (
    <div>
      {tagName && (
        <div className="mb-4 flex justify-between">
          <Heading as="h1" size="lg">
            {tagName}
          </Heading>
          <Heading as="h2" size="lg">
            {`${totalCount}件`}
          </Heading>
        </div>
      )}
      <section>
        <Suspense fallback={<Skeleton length={10} />}>
          <Await resolve={contents}>
            {(contents) => (
              <>
                <PostList contents={contents} />
                <Pagination {...{ paginateNum, totalCount }} />
              </>
            )}
          </Await>
        </Suspense>
      </section>
    </div>
  );
};

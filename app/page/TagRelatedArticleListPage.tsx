import { Await } from '@remix-run/react';
import { Suspense } from 'react';

import { Heading, MainLayout, Pagination, Skeleton } from '../components';
import { PostList, TagArea } from '../features';

import type { Content } from '../schema';
import type { SerializeFrom } from '@remix-run/cloudflare';
import type { ComponentProps } from 'react';

type Props = {
  contents: Promise<SerializeFrom<Content[]>>;
  tagName?: string;
  paginateNum: ComponentProps<typeof Pagination>['paginateNum'];
  totalCount: ComponentProps<typeof Pagination>['totalCount'];
  tags: ComponentProps<typeof TagArea>['tagField'];
};

export const TagRelatedArticleListPage = ({ contents, tagName, paginateNum, totalCount, tags }: Props) => {
  return (
    <MainLayout>
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
      <section>
        <Heading as="h2" size="lg">
          Tags
        </Heading>
        <div className="mt-4">
          <TagArea tagField={tags} />
        </div>
      </section>
    </MainLayout>
  );
};

import { Await } from '@remix-run/react';
import { Suspense } from 'react';

import { Heading, Pagination, Skeleton } from '../components';
import { PostList, ProfileArea, TagArea } from '../features';

import type { ContentList } from '../types';
import type { SerializeFrom } from '@remix-run/cloudflare';
import type { ComponentProps } from 'react';

type Props = {
  contents: Promise<SerializeFrom<ContentList['contents']>>;
  paginateNum: ComponentProps<typeof Pagination>['paginateNum'];
  totalCount: ComponentProps<typeof Pagination>['totalCount'];
  tags: ComponentProps<typeof TagArea>['tagField'];
};

const SkkeletonList = () => {
  return Array.from({ length: 10 }, (_, i) => i + 1).map((e) => <Skeleton key={e} />);
};

export const ArticleListPage = ({ contents, paginateNum, totalCount, tags }: Props) => {
  const isFirstPage = !paginateNum || paginateNum === 1;
  return (
    <div>
      {isFirstPage && <ProfileArea />}
      <section>
        <Heading as="h2" size="lg" className="mb-4">
          Posts
        </Heading>
        <Suspense fallback={<SkkeletonList />}>
          <Await resolve={contents}>
            {(contents) => (
              <>
                <PostList contents={contents} />
                <Pagination paginateNum={paginateNum} totalCount={totalCount} />
              </>
            )}
          </Await>
        </Suspense>
      </section>
      {isFirstPage && (
        <section>
          <Heading as="h2" size="lg">
            Tags
          </Heading>
          <div className="mt-4">
            <TagArea tagField={tags} />
          </div>
        </section>
      )}
    </div>
  );
};

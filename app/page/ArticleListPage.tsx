import { Await } from '@remix-run/react';
import { Suspense } from 'react';

import { Heading, Pagination, Skeleton } from '../components';
import { PostList, ProfileArea, TagArea } from '../features';

import type { ContentList, PaginateNum } from '../types';
import type { SerializeFrom } from '@remix-run/cloudflare';
import type { ComponentProps } from 'react';

type Props = {
  posts: Promise<SerializeFrom<ContentList & PaginateNum>>;
  tags: ComponentProps<typeof TagArea>['tagField'];
};

const SkkeletonList = () => {
  return Array.from({ length: 10 }, (_, i) => i + 1).map((e) => <Skeleton key={e} />);
};

export const ArticleListPage = ({ posts, tags }: Props) => {
  return (
    <Suspense fallback={<SkkeletonList />}>
      <Await resolve={posts}>
        {({ contents, paginateNum, totalCount }) => {
          const isFirstPage = !paginateNum || paginateNum === 1;
          return (
            <>
              {isFirstPage && <ProfileArea />}
              <section>
                <Heading as="h2" size="lg" className="mb-4">
                  Posts
                </Heading>
                <PostList contents={contents} />
                <Pagination paginateNum={paginateNum} totalCount={totalCount} />
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
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};

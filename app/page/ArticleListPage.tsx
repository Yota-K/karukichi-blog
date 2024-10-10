import { Await } from '@remix-run/react';
import { Suspense } from 'react';

import { Heading, Pagination, Skeleton } from '../components';
import { PostList, ProfileArea, TagArea } from '../features';

import type { Content } from '../schema';
import type { SerializeFrom } from '@remix-run/cloudflare';
import type { ComponentProps } from 'react';

type Props = {
  contents: Promise<SerializeFrom<Content[]>>;
  paginateNum: ComponentProps<typeof Pagination>['paginateNum'];
  totalCount: ComponentProps<typeof Pagination>['totalCount'];
  tags: ComponentProps<typeof TagArea>['tagField'];
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

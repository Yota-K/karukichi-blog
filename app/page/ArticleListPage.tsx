import { Heading, Pagination } from '../components';
import { PostList, ProfileArea, TagArea } from '../features';

import type { Content } from '../types';
import type { ComponentProps } from 'react';

type Props = {
  contents: Content[];
  paginateNum: ComponentProps<typeof Pagination>['paginateNum'];
  totalCount: ComponentProps<typeof Pagination>['totalCount'];
  tags: ComponentProps<typeof TagArea>['tagField'];
};

export const ArticleListPage = ({ contents, paginateNum, totalCount, tags }: Props) => {
  const isFirstPage = !paginateNum || paginateNum === 1;
  return (
    <div>
      <ProfileArea />
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
    </div>
  );
};

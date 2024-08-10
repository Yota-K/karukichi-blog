import { Heading, Pagination } from '../components';
import { PostList } from '../features';

import type { Content } from '../types';
import type { ComponentProps } from 'react';

type Props = {
  contents: Content[];
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
        <PostList contents={contents} />
        <Pagination paginateNum={paginateNum} totalCount={totalCount} />
      </section>
    </div>
  );
};
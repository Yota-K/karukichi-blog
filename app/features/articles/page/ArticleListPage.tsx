import { Pagination } from '../../../components';
import { PostList, TagArea } from '../components';

import type { Content } from '../../../types';
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
      {isFirstPage && (
        <div className="mb-8">
          <TagArea tagField={tags} />
        </div>
      )}
      <PostList contents={contents} />
      <Pagination paginateNum={paginateNum} totalCount={totalCount} />
    </div>
  );
};

import { Pagination } from '../../../components';
import { PostList } from '../components';

import type { Content } from '../../../types';
import type { ComponentProps } from 'react';

type Props = {
  contents: Content[];
  paginateNum: ComponentProps<typeof Pagination>['paginateNum'];
  totalCount: ComponentProps<typeof Pagination>['totalCount'];
};

export const ArticleListPage = ({ contents, paginateNum, totalCount }: Props) => {
  return (
    <>
      <PostList contents={contents} />
      <Pagination paginateNum={paginateNum} totalCount={totalCount} />
    </>
  );
};

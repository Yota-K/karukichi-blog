import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import { config } from '../../config';
import { Link } from '../Link';

type PaginationItemProps = {
  linkTo: number;
  type: 'prev' | 'next';
};
const PaginationItem = ({ linkTo, type }: PaginationItemProps) => {
  return (
    <Link
      className="inline-block text-3xl text-blue-primary transition-all duration-300 hover:text-blue-secondary hover:underline"
      to={{
        search: `?page=${linkTo}`,
      }}
      aria-label={type === 'prev' ? '戻る' : '進む'}
    >
      {type === 'prev' ? <MdNavigateBefore /> : <MdNavigateNext />}
    </Link>
  );
};

type Props = {
  paginateNum: number | undefined;
  totalCount: number;
};

const InnerPagination = ({ paginateNum, totalCount }: Props) => {
  const { paginateLimit } = config;

  if (totalCount <= paginateLimit) return null;

  if (!paginateNum || paginateNum === 1) {
    return (
      <div className="flex justify-end">
        <PaginationItem linkTo={2} type="next" />
      </div>
    );
  }

  const totalPaginateNum = Math.ceil(totalCount / paginateLimit);

  if (paginateNum === totalPaginateNum) {
    return (
      <div className="flex justify-start">
        <PaginationItem linkTo={paginateNum - 1} type="prev" />
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <PaginationItem linkTo={paginateNum - 1} type="prev" />
      <PaginationItem linkTo={paginateNum + 1} type="next" />
    </div>
  );
};

export const Pagination = ({ paginateNum, totalCount }: Props) => {
  return <InnerPagination paginateNum={paginateNum} totalCount={totalCount} />;
};

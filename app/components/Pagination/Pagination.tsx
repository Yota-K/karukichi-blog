import { config } from '../../config';
import { Link } from '../Link';

type PaginationItemProps = {
  linkTo: number;
  type: 'prev' | 'next';
};
const PaginationItem = ({ linkTo, type }: PaginationItemProps) => {
  return (
    <Link
      className="text-blue-secondary transition-all duration-300 hover:underline hover:opacity-70"
      to={{
        search: `?page=${linkTo}`,
      }}
    >
      {type === 'prev' ? '<< Prev' : 'Next >>'}
    </Link>
  );
};

type Props = {
  paginateNum: number | undefined;
  totalCount: number;
};

const InnerPagination = ({ paginateNum, totalCount }: Props) => {
  if (!paginateNum || paginateNum === 1) {
    return (
      <div className="flex justify-end">
        <PaginationItem linkTo={2} type="next" />
      </div>
    );
  }

  const totalPaginateNum = Math.ceil(totalCount / config.paginateLimit);

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
  return (
    <div className="mt-8">
      <InnerPagination paginateNum={paginateNum} totalCount={totalCount} />
    </div>
  );
};

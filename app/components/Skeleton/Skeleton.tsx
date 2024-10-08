type Props = {
  length?: number;
};

export const Skeleton = ({ length = 1 }: Props) => {
  const list = Array.from({ length }, (_, i) => i + 1);
  return (
    <>
      {list.map((e) => (
        <div role="status" className="max-w-sm animate-pulse" key={e}>
          <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </>
  );
};

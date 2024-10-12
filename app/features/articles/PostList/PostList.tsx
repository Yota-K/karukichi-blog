import { PostItem } from '../PostItem';

import type { Content } from '../../../schema';

type Props = {
  contents: Content[];
};

export const PostList = ({ contents }: Props) => {
  return (
    <div className="mb-4 flex flex-col flex-wrap gap-6">
      {contents.map((content) => (
        <PostItem key={content.id} content={content} />
      ))}
    </div>
  );
};

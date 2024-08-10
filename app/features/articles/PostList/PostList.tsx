import { PostItem } from '../PostItem';

import type { Content } from '../../../types';

type Props = {
  contents: Content[];
};

export const PostList = ({ contents }: Props) => {
  return (
    <div className="flex flex-col flex-wrap gap-6">
      {contents.map((content) => (
        <PostItem key={content.id} content={content} />
      ))}
    </div>
  );
};

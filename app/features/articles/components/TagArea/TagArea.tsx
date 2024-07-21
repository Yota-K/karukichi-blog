import { Tag } from '../../../../components';

import type { Content } from '../../../../types';

type Props = {
  tagField: Content['tag_field'];
};

export const TagArea = ({ tagField }: Props) => {
  return (
    <div className="mt-2 flex gap-2">
      {tagField.map((tag) => (
        <Tag key={tag.id} to={`/tags/${tag.id}`}>
          {tag.name}
        </Tag>
      ))}
    </div>
  );
};

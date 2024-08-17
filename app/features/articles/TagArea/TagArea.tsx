import { Tag } from '../../../components';

import type { TaxonomyField } from '../../../types';

// idとnameのみ必須にする
// TODO: 記事一覧を取得するときもidとnameのみ取得できるようにできれば、もっとシンプルにかける
type PartialTaxonomyField = Partial<TaxonomyField>;
type RequiredIdAndName = Required<Pick<PartialTaxonomyField, 'id' | 'name'>>;

type Props = {
  tagField: PartialTaxonomyField & RequiredIdAndName[];
};

export const TagArea = ({ tagField }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tagField.map((tag) => (
        <Tag key={tag.id} to={`/tags/${tag.id}`}>
          {tag.name}
        </Tag>
      ))}
    </div>
  );
};

import { Tag } from '../../../components';

import type { Content } from '../../../schema';

// idとnameのみ必須にする
// TODO: 記事一覧を取得するときもidとnameのみ取得できるようにできれば、もっとシンプルにかける
type TaxonomyField = Content['tag_field'][number];
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

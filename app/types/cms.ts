export type Common<T> = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt: string;
} & T;

export type TaxonomyField = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  posts: {
    id: string;
  }[];
};

type ContentType = 'cms' | 'qiita';

export type Content = Common<{
  title: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
  body: string;
  type: ContentType[];
  description: string;
  category_field: TaxonomyField;
  tag_field: TaxonomyField[];
}>;

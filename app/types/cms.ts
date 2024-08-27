import type { MicroCMSListResponse } from 'microcms-js-sdk';

export type { MicroCMSListResponse };

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
  body: string;
  type: ContentType[];
  description: string;
  tag_field: TaxonomyField[];
}>;

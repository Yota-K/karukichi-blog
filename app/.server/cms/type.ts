import type { Content, TaxonomyField } from '../../types';

export type TagResponse = Pick<TaxonomyField, 'id' | 'name'>;

export type FindPostResponse = {
  status: number;
  content?: Content;
};

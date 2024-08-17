import type { TaxonomyField } from '../../types';
import type { MicroCMSListResponse } from 'microcms-js-sdk';

export type TagResponse = Pick<TaxonomyField, 'id' | 'name'>;

export type { MicroCMSListResponse };

import type { TaxonomyField } from '../../types';
import type { MicroCMSQueries } from 'microcms-js-sdk';

export type CustomErrorResponse = { status: number; message: string };
export type PickMicroCMSQueries = Pick<MicroCMSQueries, 'offset' | 'limit' | 'filters' | 'fields'>;
export type TagResponse = Pick<TaxonomyField, 'id' | 'name'>;

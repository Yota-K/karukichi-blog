import type { Content } from '../../schema';
import type { MicroCMSQueries } from 'microcms-js-sdk';

export type CustomErrorResponse = { status: number; message: string };
export type PickMicroCMSQueries = Pick<MicroCMSQueries, 'offset' | 'limit' | 'filters' | 'fields'>;

type TaxonomyField = Content['tag_field'][number];
export type TagResponse = Pick<TaxonomyField, 'id' | 'name'>;

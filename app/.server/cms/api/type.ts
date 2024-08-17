import type { Content } from '../../../types';
import type { ClientType } from '../client';
import type { MicroCMSListResponse, TagResponse } from '../type';
import type { MicroCMSQueries } from 'microcms-js-sdk';

export type { Content };
export type { ClientType };
export type { TagResponse };

export type PickMicroCMSQueries = Pick<MicroCMSQueries, 'offset' | 'limit' | 'filters' | 'fields'>;

export type CmsApi = {
  getPosts: (client: ClientType, queries?: PickMicroCMSQueries) => Promise<MicroCMSListResponse<Content>>;
  findPost: (client: ClientType, contentId: string) => Promise<Content>;
  getTags: (client: ClientType) => Promise<MicroCMSListResponse<TagResponse>>;
};

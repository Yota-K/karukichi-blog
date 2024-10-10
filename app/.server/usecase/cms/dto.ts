import type { Content } from '../../../schema';
import type { Toc } from '../../../types';
import type { TagResponse } from '../../cms';
import type { MicroCMSListResponse } from 'microcms-js-sdk';

type PaginateNum = {
  paginateNum?: number;
};

type ContentList = MicroCMSListResponse<Content>;
export type GetPostsDto = ContentList & PaginateNum;

export type GetPostsByTagDto = ContentList & {
  tagName: string | undefined;
  tagSlug: string | undefined;
  paginateNum: number | undefined;
};

export type FindPostDto = {
  status: number;
  content?: Content;
  toc: Toc[];
};

export type GetTagsDto = {
  tags: MicroCMSListResponse<TagResponse>;
};

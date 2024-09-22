import type { Content, ContentList, MicroCMSListResponse, Toc } from '../../../types';
import type { TagResponse } from '../../cms';

type PaginateNum = {
  paginateNum?: number;
};

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

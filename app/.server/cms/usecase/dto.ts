import type { Content, MicroCMSListResponse, Toc } from '../../../types';
import type { TagResponse } from '../type';

type Posts = MicroCMSListResponse<Content>;
type PaginateNum = {
  paginateNum?: number;
};

export type GetPostsDto = Posts & PaginateNum;

export type GetPostsByTagDto = Posts & {
  tagName: string | undefined;
  tagSlug: string | undefined;
  paginateNum: number | undefined;
};

export type FindPostDto = {
  content?: Content;
  status: number;
  toc: Toc[];
};

export type GetTagsDto = {
  tags: MicroCMSListResponse<TagResponse>;
};

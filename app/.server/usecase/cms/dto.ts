import type { Content, ContentList, MicroCMSListResponse, PaginateNum, Toc } from '../../../types';
import type { TagResponse } from '../../cms';

type Posts = MicroCMSListResponse<Content>;

export type GetPostsDto = ContentList & PaginateNum;

export type GetPostsByTagDto = Posts & {
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

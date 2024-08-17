import type { Content, Toc } from '../../../types';
import type { MicroCMSListResponse, TagResponse } from '../type';

export type GetPostsDto = {
  posts: MicroCMSListResponse<Content>;
  paginateNum: number | undefined;
};

export type GetPostsByTagDto = {
  posts: MicroCMSListResponse<Content>;
  tagName: string | undefined;
  tagSlug: string | undefined;
  paginateNum: number | undefined;
};

export type FindPostDto = Content & {
  toc: Toc[];
};

export type GetTagsDto = {
  tags: MicroCMSListResponse<TagResponse>;
};

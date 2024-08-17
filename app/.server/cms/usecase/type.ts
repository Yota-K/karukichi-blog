import type { FindPostDto, GetPostsByTagDto, GetPostsDto, GetTagsDto } from './dto';
import type { ClientType } from '../client';

export type CmsUseCase = {
  getPosts: (client: ClientType, pageQueryParams: string | null) => Promise<GetPostsDto>;
  getPostsByTag: (client: ClientType, tagId: string, pageQueryParams: string | null) => Promise<GetPostsByTagDto>;
  findPost: (client: ClientType, contentId: string) => Promise<FindPostDto>;
  getTags: (client: ClientType) => Promise<GetTagsDto>;
};

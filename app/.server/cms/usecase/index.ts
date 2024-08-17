import { Config } from '../../../config';
import { htmlParser } from '../../htmlParser';
import { cmsApi } from '../api';
import { paginateSchema } from '../schema';

import type { FindPostDto, GetPostsByTagDto, GetPostsDto, GetTagsDto } from './dto';
import type { ClientType } from '../client';

const { paginateLimit } = Config;

export const cmsUseCase = {
  /**
   * 記事一覧を取得
   */
  getPosts: async (client: ClientType, pageQueryParams: string | null): Promise<GetPostsDto> => {
    const paginateNum = paginateSchema.safeParse(pageQueryParams);

    if (paginateNum.success) {
      const offset = paginateNum.data * paginateLimit - paginateLimit;
      const posts = await cmsApi.getPosts(client, {
        offset,
      });

      return {
        ...posts,
        paginateNum: paginateNum.data,
      };
    }

    const posts = await cmsApi.getPosts(client);
    return {
      ...posts,
      paginateNum: undefined,
    };
  },

  /**
   * タグに関連する記事一覧を取得
   */
  getPostsByTag: async (
    client: ClientType,
    tagId: string,
    pageQueryParams: string | null,
  ): Promise<GetPostsByTagDto> => {
    const paginateNum = paginateSchema.safeParse(pageQueryParams);

    let offset: undefined | number = undefined;
    if (paginateNum.success) {
      offset = paginateNum.data * paginateLimit - paginateLimit;
    }

    const posts = await cmsApi.getPosts(client, {
      offset,
      filters: `tag_field[contains]${tagId}`,
    });
    const findTag = posts.contents[0].tag_field.find((tag) => tag.id === tagId);

    return {
      ...posts,
      tagName: findTag?.name,
      tagSlug: findTag?.id,
      paginateNum: paginateNum.data,
    };
  },

  /**
   * 特定の記事を取得
   */
  findPost: async (client: ClientType, contentId: string): Promise<FindPostDto> => {
    const post = await cmsApi.findPost(client, contentId);
    const { body, toc } = htmlParser(post.body);

    return {
      ...post,
      body,
      toc,
    };
  },

  /**
   * タグ一覧を取得
   */
  getTags: async (client: ClientType): Promise<GetTagsDto> => {
    const tags = await cmsApi.getTags(client);
    return {
      tags,
    };
  },
};

export { GetPostsDto, GetPostsByTagDto, FindPostDto, GetTagsDto };

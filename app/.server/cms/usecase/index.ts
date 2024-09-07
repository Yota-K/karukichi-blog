import { config } from '../../../config';
import { contentBodyParser } from '../../htmlParser';
import { cmsApi } from '../api';
import { paginateSchema } from '../schema';

import { filterAndAssignServiceUrlToPosts } from './filterAndAssignServiceUrlToPosts';

import type { FindPostDto, GetPostsByTagDto, GetPostsDto, GetTagsDto } from './dto';
import type { ClientType } from '../client';

const { paginateLimit } = config;

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

      const filterPosts = filterAndAssignServiceUrlToPosts(posts);
      return {
        ...filterPosts,
        paginateNum: paginateNum.data,
      };
    }

    const posts = await cmsApi.getPosts(client);
    const filterPosts = filterAndAssignServiceUrlToPosts(posts);

    return {
      ...filterPosts,
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
  ): Promise<GetPostsByTagDto | undefined> => {
    const paginateNum = paginateSchema.safeParse(pageQueryParams);

    let offset: undefined | number = undefined;
    if (paginateNum.success) {
      offset = paginateNum.data * paginateLimit - paginateLimit;
    }

    const posts = await cmsApi.getPosts(client, {
      offset,
      filters: `tag_field[contains]${tagId}`,
    });
    const filterPosts = filterAndAssignServiceUrlToPosts(posts);

    if (posts.contents.length === 0) {
      return undefined;
    }

    const findTag = posts.contents[0].tag_field.find((tag) => tag.id === tagId);

    return {
      ...filterPosts,
      tagName: findTag?.name,
      tagSlug: findTag?.id,
      paginateNum: paginateNum.data,
    };
  },

  /**
   * 特定の記事を取得
   */
  findPost: async (client: ClientType, contentId: string): Promise<FindPostDto> => {
    const content = await cmsApi.findPost(client, contentId);

    // エラーが発生した時しかstatusを返却しないようにしているので、statusがある場合はエラーとして扱う
    if ('status' in content) {
      return {
        status: content.status,
        content: undefined,
        toc: [],
      };
    }

    const { body, toc } = contentBodyParser(content.body);

    return {
      status: 200,
      // parseした記事の本文で上書きする
      content: {
        ...content,
        body,
      },
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

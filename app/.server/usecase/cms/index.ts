import { config } from '../../../config';
import { contentBodyParser } from '../../htmlParser';
import { cmsRepository, kvRepository } from '../../repository';

import { filterAndAssignServiceUrlToPosts } from './filterAndAssignServiceUrlToPosts';
import { paginateSchema } from './schema';

import type { FindPostDto, GetPostsByTagDto, GetPostsDto, GetTagsDto } from './dto';
import type { Content } from '../../../types';
import type { ClientType } from '../../cms';

const { paginateLimit } = config;

export const cmsUseCase = {
  /**
   * 記事一覧を取得
   */
  getPosts: async (client: ClientType, pageQueryParams: string | null): Promise<GetPostsDto> => {
    const paginateNum = paginateSchema.safeParse(pageQueryParams);

    if (paginateNum.success) {
      const offset = paginateNum.data * paginateLimit - paginateLimit;
      const posts = await cmsRepository.getPosts(client, {
        offset,
      });

      const filterPosts = filterAndAssignServiceUrlToPosts(posts);
      return {
        ...filterPosts,
        paginateNum: paginateNum.data,
      };
    }

    const posts = await cmsRepository.getPosts(client);
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

    const posts = await cmsRepository.getPosts(client, {
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
  findPost: async (
    client: ClientType,
    contentId: string,
    draftKey: string | null,
    kv: KVNamespace<string>,
    isDev: boolean,
  ): Promise<FindPostDto> => {
    const cachedResponse = isDev ? null : await kvRepository.getPostDetailCache<Content>(kv, contentId);

    if (!cachedResponse || draftKey !== null) {
      const content = await cmsRepository.findPost(client, contentId, draftKey);
      // エラーが発生した時しかstatusを返却しないようにしているので、statusがある場合はエラーとして扱う
      if ('status' in content) {
        return {
          status: content.status,
          content: undefined,
          toc: [],
        };
      }

      // dev環境でなく、draftKeyがnull（下書きではない時）の場合はキャッシュに保存する
      if (!isDev && draftKey === null) await kvRepository.savePostDetailCache(kv, contentId, content);
      const { body, toc } = contentBodyParser(content.body);

      return {
        status: 200,
        content: {
          ...content,
          body,
        },
        toc,
      };
    }

    const { body, toc } = contentBodyParser(cachedResponse.body);

    return {
      status: 200,
      // parseした記事の本文で上書きする
      content: {
        ...cachedResponse,
        body,
      },
      toc,
    };
  },

  /**
   * タグ一覧を取得
   */
  getTags: async (client: ClientType): Promise<GetTagsDto> => {
    const tags = await cmsRepository.getTags(client);
    return {
      tags,
    };
  },
};

export { GetPostsDto, GetPostsByTagDto, FindPostDto, GetTagsDto };

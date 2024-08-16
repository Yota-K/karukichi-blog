import * as cheerio from 'cheerio';
import hljs from 'highlight.js';

import { Config } from '../../config';

import { cmsApi } from './api';
import { paginateSchema } from './schema';

import type { ClientType } from './client';
import type { Toc } from '../../types';

const { paginateLimit } = Config;

export const cmsUseCase = {
  /**
   * 記事一覧を取得
   */
  getPosts: async (client: ClientType, pageQueryParams: string | null) => {
    const paginateNum = paginateSchema.safeParse(pageQueryParams);

    if (paginateNum.success) {
      const offset = paginateNum.data * paginateLimit - paginateLimit;
      const posts = await cmsApi.getPosts(client, {
        offset,
      });

      return {
        posts,
        paginateNum: paginateNum.data,
      };
    }

    const posts = await cmsApi.getPosts(client);
    return {
      posts,
      paginateNum: undefined,
    };
  },

  /**
   * タグに関連する記事一覧を取得
   */
  getPostsByTag: async (client: ClientType, tagId: string, pageQueryParams: string | null) => {
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
      posts,
      tagName: findTag?.name,
      tagSlug: findTag?.id,
      paginateNum: paginateNum.data,
    };
  },

  /**
   * 特定の記事を取得
   */
  findPost: async (client: ClientType, contentId: string) => {
    const post = await cmsApi.findPost(client, contentId);

    // コードブロックのシンタックスハイライト
    const $ = cheerio.load(post.body);
    $('pre > code').each((_, elm) => {
      const result = hljs.highlightAuto($(elm).text());
      $(elm).html(result.value);
      $(elm).addClass('hljs');
    });

    // 目次の生成
    const headings = $('h2, h3').toArray();
    const toc: Toc[] = headings.map((data) => ({
      id: data.attribs.id,
      tagName: data.name,
      text: $(data).text(),
    }));

    return {
      ...post,
      body: $.html(),
      toc,
    };
  },

  /**
   * タグ一覧を取得
   */
  getTags: async (client: ClientType) => {
    return cmsApi.getTags(client);
  },
};

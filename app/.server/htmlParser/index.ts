import * as cheerio from 'cheerio';
import hljs from 'highlight.js';

import type { Toc } from '../../types';

/**
 * シンタックスハイライトを付与する
 */
const addSyntaxHighlight = (_$: cheerio.CheerioAPI) => {
  _$('pre > code').each((_, elm) => {
    const result = hljs.highlightAuto(_$(elm).text());
    _$(elm).html(result.value);
    _$(elm).addClass('hljs');
  });
};

/**
 * 目次を生成する
 */
const generateToc = (_$: cheerio.CheerioAPI): Toc[] => {
  const headings = _$('h2, h3').toArray();
  return headings.map((data) => ({
    id: data.attribs.id,
    tagName: data.name,
    text: _$(data).text(),
  }));
};

/**
 * htmlからaタグのhrefを取得する
 */
export const anchorTagParser = (body: string): string | undefined => {
  const $ = cheerio.load(body);
  return $('a').attr('href');
};

/**
 * htmlをパースする処理
 */
export const contentBodyParser = (
  body: string,
): {
  body: string;
  toc: Toc[];
} => {
  const $ = cheerio.load(body);

  addSyntaxHighlight($);
  const toc = generateToc($);

  return {
    body: $.html(),
    toc,
  };
};

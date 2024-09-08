import * as cheerio from 'cheerio';

import type { Toc } from '../../types';

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

  const toc = generateToc($);

  return {
    body: $.html(),
    toc,
  };
};

import type { Toc } from '../../types';

/**
 * 正規表現でh2, h3タグから目次を生成する
 * cheerioを使わず軽量に処理する
 */
const generateToc = (body: string): Toc[] => {
  const toc: Toc[] = [];
  // <h2 id="xxx">text</h2> または <h3 id="xxx">text</h3> を抽出
  const headingRegex = /<(h[23])[^>]*id\s*=\s*["']([^"']*)["'][^>]*>([\s\S]*?)<\/\1>/gi;

  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(body)) !== null) {
    const tagName = match[1].toLowerCase();
    const id = match[2];
    // HTMLタグを除去してテキストのみ抽出
    const text = match[3].replace(/<[^>]*>/g, '').trim();

    toc.push({ id, tagName, text });
  }

  return toc;
};

/**
 * htmlをパースして目次を生成する
 * NOTE: bodyはそのまま返す（変換不要）
 */
export const contentBodyParser = (
  body: string,
): {
  body: string;
  toc: Toc[];
} => {
  const toc = generateToc(body);

  return {
    body,
    toc,
  };
};

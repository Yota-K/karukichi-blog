import type { Toc } from '../../types';

/**
 * HTMLエンティティをデコードする
 */
const decodeHtmlEntities = (text: string): string => {
  const entities: Record<string, string> = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
  };

  return text.replace(/&(?:lt|gt|amp|quot|#39|apos|nbsp);/g, (match) => entities[match] || match);
};

/**
 * HTMLタグを除去する（開始タグ・終了タグ・自己終了タグのみ）
 */
const stripHtmlTags = (text: string): string => {
  // HTMLタグは <tagname...> または </tagname> または <tagname.../> の形式
  // タグ名は英字で始まる
  return text.replace(/<\/?[a-zA-Z][^>]*\/?>/g, '');
};

/**
 * 正規表現でh2, h3タグから目次を生成する
 */
const generateToc = (body: string): Toc[] => {
  const toc: Toc[] = [];
  // <h2 id="xxx">text</h2> または <h3 id="xxx">text</h3> を抽出
  const headingRegex = /<(h[23])[^>]*id\s*=\s*["']([^"']*)["'][^>]*>([\s\S]*?)<\/\1>/gi;

  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(body)) !== null) {
    const tagName = match[1].toLowerCase();
    const id = match[2];
    // HTMLタグを除去し、HTMLエンティティをデコードしてテキストのみ抽出
    const text = decodeHtmlEntities(stripHtmlTags(match[3])).trim();

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

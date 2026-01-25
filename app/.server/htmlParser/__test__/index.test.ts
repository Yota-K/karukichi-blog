import { describe, expect, it } from 'vitest';

import { contentBodyParser } from '../index';

describe(contentBodyParser, () => {
  describe('目次生成', () => {
    it('h2タグから目次を生成できる', () => {
      const body = '<h2 id="section1">セクション1</h2><p>本文</p>';
      const result = contentBodyParser(body);

      expect(result.toc).toEqual([{ id: 'section1', tagName: 'h2', text: 'セクション1' }]);
    });

    it('h3タグから目次を生成できる', () => {
      const body = '<h3 id="subsection1">サブセクション1</h3><p>本文</p>';
      const result = contentBodyParser(body);

      expect(result.toc).toEqual([{ id: 'subsection1', tagName: 'h3', text: 'サブセクション1' }]);
    });

    it('h2とh3タグが混在する場合も正しく目次を生成できる', () => {
      const body = `
        <h2 id="section1">セクション1</h2>
        <p>本文1</p>
        <h3 id="subsection1">サブセクション1</h3>
        <p>本文2</p>
        <h2 id="section2">セクション2</h2>
        <p>本文3</p>
      `;
      const result = contentBodyParser(body);

      expect(result.toc).toEqual([
        { id: 'section1', tagName: 'h2', text: 'セクション1' },
        { id: 'subsection1', tagName: 'h3', text: 'サブセクション1' },
        { id: 'section2', tagName: 'h2', text: 'セクション2' },
      ]);
    });
  });

  describe('HTMLエンティティのデコード', () => {
    it('&lt;と&gt;をデコードできる', () => {
      const body = '<h2 id="pick">Pick&lt;T, K&gt;</h2>';
      const result = contentBodyParser(body);

      expect(result.toc).toEqual([{ id: 'pick', tagName: 'h2', text: 'Pick<T, K>' }]);
    });

    it('TypeScriptのUtility Typesを含む見出しを正しくデコードできる', () => {
      const body = `
        <h2 id="utility-types">TypeScriptのUtility Typesとは？</h2>
        <h3 id="pick-omit">Pick&lt;T, K&gt;・Omit&lt;T, K&gt;</h3>
        <h3 id="readonly">Readonly&lt;T&gt;</h3>
        <h3 id="returntype">ReturnType&lt;T&gt;</h3>
        <h3 id="partial-required">Partial&lt;T&gt;・Required&lt;T&gt;</h3>
        <h3 id="extract-exclude">Extract&lt;T, U&gt;・Exclude&lt;T, U&gt;</h3>
      `;
      const result = contentBodyParser(body);

      expect(result.toc).toEqual([
        { id: 'utility-types', tagName: 'h2', text: 'TypeScriptのUtility Typesとは？' },
        { id: 'pick-omit', tagName: 'h3', text: 'Pick<T, K>・Omit<T, K>' },
        { id: 'readonly', tagName: 'h3', text: 'Readonly<T>' },
        { id: 'returntype', tagName: 'h3', text: 'ReturnType<T>' },
        { id: 'partial-required', tagName: 'h3', text: 'Partial<T>・Required<T>' },
        { id: 'extract-exclude', tagName: 'h3', text: 'Extract<T, U>・Exclude<T, U>' },
      ]);
    });

    it('&amp;をデコードできる', () => {
      const body = '<h2 id="and">A &amp; B</h2>';
      const result = contentBodyParser(body);

      expect(result.toc).toEqual([{ id: 'and', tagName: 'h2', text: 'A & B' }]);
    });

    it('&quot;をデコードできる', () => {
      const body = '<h2 id="quote">&quot;引用&quot;</h2>';
      const result = contentBodyParser(body);

      expect(result.toc).toEqual([{ id: 'quote', tagName: 'h2', text: '"引用"' }]);
    });
  });

  describe('HTMLタグの除去', () => {
    it('見出し内のHTMLタグを除去できる', () => {
      const body = '<h2 id="styled"><strong>強調</strong>されたテキスト</h2>';
      const result = contentBodyParser(body);

      expect(result.toc).toEqual([{ id: 'styled', tagName: 'h2', text: '強調されたテキスト' }]);
    });

    it('見出し内のcodeタグを除去できる', () => {
      const body = '<h2 id="code"><code>console.log()</code>について</h2>';
      const result = contentBodyParser(body);

      expect(result.toc).toEqual([{ id: 'code', tagName: 'h2', text: 'console.log()について' }]);
    });

    it('HTMLタグとHTMLエンティティが混在する場合も正しく処理できる', () => {
      const body = '<h2 id="mixed"><code>Array&lt;T&gt;</code>の使い方</h2>';
      const result = contentBodyParser(body);

      expect(result.toc).toEqual([{ id: 'mixed', tagName: 'h2', text: 'Array<T>の使い方' }]);
    });
  });

  describe('bodyの返却', () => {
    it('bodyはそのまま返却される', () => {
      const body = '<h2 id="test">テスト</h2><p>本文</p>';
      const result = contentBodyParser(body);

      expect(result.body).toBe(body);
    });
  });
});

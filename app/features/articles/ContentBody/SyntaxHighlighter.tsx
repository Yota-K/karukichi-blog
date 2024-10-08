import { useEffect, useState } from 'react';

import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  lang: string;
}>;

export const SyntaxHighlighter = ({ children, lang }: Props) => {
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    if (!children) return;

    // NOTE: 以下の理由で esm.sh からshikiをimportしている
    // - worker bundleのサイズを小さくするため
    // - cloudflare workersの無料枠だと、実行時間を10ms以内にしないと、CPU timeの制限に引っかかってしまうので、クライアントサイドでシンタックスハイライトを適用したいため
    //
    // @ts-expect-error: import from esm.sh to avoid large worker bundle
    // eslint-disable-next-line import/no-unresolved
    import('https://esm.sh/shiki@1.16.0').then(async ({ codeToHtml }) => {
      setHighlightedCode(await codeToHtml(children, { lang, theme: 'github-dark' }));
    });
  }, [children, lang]);

  if (!children) return null;

  return (
    <>
      {highlightedCode ? (
        <p dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      ) : (
        // NOTE: prose-pre:bg-には、shikiで使用するテーマの背景色を指定している
        // 記事本文で使用するpreのCSSよりも優先度をあげたいため、importantを使用している
        <pre className="!bg-[#24292e]">
          <code>{children}</code>
        </pre>
      )}
    </>
  );
};

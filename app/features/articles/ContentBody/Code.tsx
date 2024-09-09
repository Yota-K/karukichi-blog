import { useEffect, useState } from 'react';

import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  lang: string;
}>;

export const Code = ({ children: code, lang }: Props) => {
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    if (!code) return;

    // 以下の理由で esm.sh からshikiをimportしている
    // - worker bundleのサイズを小さくするため
    // - cloudflare workersの無料枠だと、実行時間を10ms以内にしないと、CPU timeの制限に引っかかってしまうので、クライアントサイドでシンタックスハイライトを適用したいため
    //
    // @ts-expect-error: import from esm.sh to avoid large worker bundle
    // eslint-disable-next-line import/no-unresolved
    import('https://esm.sh/shiki@1.16.0').then(async ({ codeToHtml }) => {
      setHighlightedCode(await codeToHtml(code, { lang, theme: 'dracula' }));
    });
  }, [code, lang]);

  if (!code) return null;

  return <>{highlightedCode ? <div dangerouslySetInnerHTML={{ __html: highlightedCode }} /> : <code>{code}</code>}</>;
};

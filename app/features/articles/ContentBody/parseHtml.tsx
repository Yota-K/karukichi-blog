import { createElement, Fragment, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-internal-modules
import * as prod from 'react/jsx-runtime';
import parse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { unified } from 'unified';

import type { PropsWithChildren } from 'react';

// @ts-expect-error: the react types are missing.
// eslint-disable-next-line import/namespace
const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

export const parseHtml = (content: string) => {
  return (
    unified()
      .use(parse, { fragment: true })
      // @ts-expect-error: the react types are missing.
      .use(rehypeReact, {
        ...production,
        passNode: true,
        Fragment,
        createElement,
        components: {
          code: (props) => {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            const matchLang = match ? match[1] : '';
            return (
              <Code lang={matchLang} {...rest}>
                {children}
              </Code>
            );
          },
        },
      })
      .processSync(content).result
  );
};

type Props = PropsWithChildren<{
  lang: string;
}>;
const Code = ({ children: code, lang }: Props) => {
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

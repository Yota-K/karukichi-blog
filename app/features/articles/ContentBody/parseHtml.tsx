import { createElement, Fragment } from 'react';
// eslint-disable-next-line import/no-internal-modules
import * as prod from 'react/jsx-runtime';
import parse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { unified } from 'unified';

import { SyntaxHighlighter } from './SyntaxHighlighter';

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
            const matchLang = match ? match[1] : undefined;
            return (
              <SyntaxHighlighter lang={matchLang} {...rest}>
                {children}
              </SyntaxHighlighter>
            );
          },
        },
      })
      .processSync(content).result
  );
};

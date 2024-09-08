import { Highlight, themes } from 'prism-react-renderer';
import { createElement, Fragment, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
// eslint-disable-next-line import/no-internal-modules
import * as prod from 'react/jsx-runtime';
import parse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { unified } from 'unified';

// @ts-expect-error: the react types are missing.
// eslint-disable-next-line import/namespace
const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

type Props = {
  body: string;
};

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
            return match ? (
              <Highlight theme={themes.shadesOfPurple} code={String(children)} language="tsx">
                {({ style, tokens, getLineProps, getTokenProps }) => (
                  <pre style={style}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        <span>{i + 1}</span>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        },
      })
      .processSync(content).result
  );
};

export const ContentBody = ({ body }: Props) => {
  useEffect(() => {
    const url = 'https://platform.twitter.com/widgets.js';
    const script = document.createElement('script');

    script.src = url;
    script.setAttribute('async', 'async');

    document.body.appendChild(script);
  }, []);

  return (
    <div className="prose break-words lg:prose-base prose-a:text-blue-primary prose-img:rounded-xl prose-img:shadow-md">
      {parseHtml(body)}
    </div>
  );
};

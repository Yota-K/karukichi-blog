import { useEffect } from 'react';
// import 'highlight.js/styles/github-dark-dimmed.min.css';

type Props = {
  body: string;
};

export const ContentBody = ({ body }: Props) => {
  useEffect(() => {
    const url = 'https://platform.twitter.com/widgets.js';
    const script = document.createElement('script');

    script.src = url;
    script.setAttribute('async', 'async');

    document.body.appendChild(script);
  }, []);

  // NOTE: prose-pre:bg-には、highlight.jsの背景色を指定している
  return (
    <div
      className="prose break-words lg:prose-base prose-a:text-blue-primary prose-pre:bg-[#22272e] prose-img:rounded-xl prose-img:shadow-md"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
};

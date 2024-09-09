import { useEffect } from 'react';

import { parseHtml } from './parseHtml';

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

  return (
    <div className="prose break-words lg:prose-base prose-a:text-blue-primary prose-img:rounded-xl prose-img:shadow-md">
      {parseHtml(body)}
    </div>
  );
};

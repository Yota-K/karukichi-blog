import { useEffect } from 'react';

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
    <div
      className="prose mt-6 lg:prose-base prose-a:text-blue-primary prose-img:rounded-xl prose-img:shadow-md"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
};

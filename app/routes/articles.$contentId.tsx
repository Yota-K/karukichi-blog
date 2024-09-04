import { useLoaderData } from '@remix-run/react';

import { articleDetailLoader as loader } from '../.server';
import { config } from '../config';
import { ArticleDetailPage } from '../page';

import type { HeadersFunction, MetaFunction } from '@remix-run/cloudflare';

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'max-age=0, s-maxage=604800, stale-while-revalidate=360, stale-if-error=86400',
  };
};

export { loader };

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const content = data?.content;

  if (!content) return [];

  const title = `${content.title} | ${config.siteTitle}`;
  return [
    { title },
    {
      name: 'description',
      content: content.description,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: content.description,
    },
    {
      property: 'og:image',
      content: `https://images.microcms-assets.io/assets/a1b0a00f12674fdaaf05fbe85c44b8be/01e7a8dd5df94ffea06b66b6808af7d9/ogp.png?usm=20&fit=crop&blend-mode=normal&blend-alpha=100&?blend-align=middle.center&blend-w=1.0&blend=https%3A%2F%2Fassets.imgix.net%2F~text%3Ftxt%3D+${content?.title}+%26txt-color%3D000000%26width%3D1000%26txt-align%3Dcenter%26txtfont=Hiragino%20Sans%20W6%26txt-size%3D32`,
    },
    {
      property: 'og:type',
      content: 'article',
    },
  ];
};

export default function Page() {
  const { content, toc } = useLoaderData<typeof loader>();
  if (!content) return <></>;
  return <ArticleDetailPage content={{ ...content, toc }} />;
}

import { useLoaderData } from '@remix-run/react';

import { articleDetailLoader as loader } from '../.server';
import { config } from '../config';
import { ArticleDetailPage } from '../page';

import type { HeadersFunction, MetaFunction } from '@remix-run/cloudflare';

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  const cacheControl =
    loaderHeaders.get('Cache-Control') ??
    'public, max-age=180, s-maxage=180, stale-while-revalidate=180, stale-if-error=180';
  return {
    'Cache-Control': cacheControl,
  };
};

export { loader };

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const content = data?.content;

  if (!content) return [];

  const title = `${content.title} | ${config.siteTitle}`;
  const ogImageUrl = config.ogImageUrl(content.title);
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
      content: ogImageUrl,
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

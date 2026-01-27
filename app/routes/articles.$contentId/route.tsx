import { useLoaderData } from 'react-router';

import { config } from '../../config';

import { loader } from './loader';
import { ArticleDetailPage } from './page';

import type { Route } from '../articles.$contentId/+types/route';
import type { HeadersFunction } from 'react-router';

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  // 記事を作成・更新した時は、CDNキャッシュを破棄するAPIで消しとばせるため、workerの負荷を下げる目的で長めに1週間キャッシュする
  // 念には念を入れて、stale-while-revalidateも1日つけておくことで、キャッシュが切れた後1日間は古いキャッシュを返しつつバックグラウンドで再取得する挙動にしている
  const cacheControl =
    loaderHeaders.get('Cache-Control') ?? 'public, max-age=0, s-maxage=604800, stale-while-revalidate=86400';
  return {
    'Cache-Control': cacheControl,
  };
};

export { loader };

export const meta: Route.MetaFunction = ({ data }) => {
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
    {
      property: 'og:url',
      content: `${config.url}/articles/${content.id}`,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:site',
      content: '@karukichi_yah',
    },
  ];
};

export default function Page() {
  const { content, toc } = useLoaderData<typeof loader>();
  if (!content) return <></>;
  return <ArticleDetailPage content={{ ...content, toc }} />;
}

import { useLoaderData } from '@remix-run/react';

import { articleDetailLoader as loader } from '../.server';
import { config } from '../config';
import { ArticleDetailPage } from '../page';

import type { HeadersFunction, MetaFunction } from '@remix-run/cloudflare';

export const headers: HeadersFunction = () => {
  return {
    // TODO: キャッシュ戦略後でちゃんと考える
    // - レスポンスは7日間（604800 秒間）は新鮮。
    // - 5日間経過したら、そこから 360s は、古いキャッシュを参照するが、バックグラウンドでfetchを行い、キャッシュを更新して、サーバから新しいリソースを取得できたら、キャッシュを更新する。
    // - 7日を過ぎると古くなるが、サーバーがエラーでレスポンスを返した場合はさらに1日（86400 秒間）利用できる。
    'Cache-Control': 'max-age=0, s-maxage=604800, stale-while-revalidate=360, stale-if-error=86400',
  };
};

export { loader };

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title = `${data?.title} | ${config.siteTitle}`;
  return [
    { title },
    {
      name: 'description',
      content: data?.description,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: data?.description,
    },
    {
      property: 'og:image',
      content: `https://images.microcms-assets.io/assets/a1b0a00f12674fdaaf05fbe85c44b8be/01e7a8dd5df94ffea06b66b6808af7d9/ogp.png?usm=20&fit=crop&blend-mode=normal&blend-alpha=100&?blend-align=middle.center&blend-w=1.0&blend=https%3A%2F%2Fassets.imgix.net%2F~text%3Ftxt%3D+${data?.title}+%26txt-color%3D000000%26width%3D1000%26txt-align%3Dcenter%26txtfont=Hiragino%20Sans%20W6%26txt-size%3D32`,
    },
    {
      property: 'og:type',
      content: 'article',
    },
  ];
};

export default function Page() {
  const content = useLoaderData<typeof loader>();
  return <ArticleDetailPage content={content} />;
}

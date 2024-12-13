import { data, useLoaderData } from 'react-router';

import type { HeadersFunction, MetaFunction } from 'react-router';

export const headers: HeadersFunction = () => {
  return {
    // "Cache-Control": "public, max-age=60, s-maxage=60, stale-if-error=120",
    'Cache-Control': 'public, max-age=120, s-maxage=120, stale-if-error=86400',
  };
};

export const meta: MetaFunction<typeof loader> = () => {
  return [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ];
};

export const loader = () => {
  const now = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  // throw new Error("This is an error");
  return data({ now });
};

export default function Page() {
  const { now } = useLoaderData<typeof loader>();
  return <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>{now}</div>;
}

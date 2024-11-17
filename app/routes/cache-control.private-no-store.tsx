import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

import type { HeadersFunction, MetaFunction, TypedResponse } from '@remix-run/cloudflare';

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'private, no-store',
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

export const loader = (): TypedResponse<{ now: string }> => {
  const now = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  return json({ now });
};

export default function Page() {
  const { now } = useLoaderData<typeof loader>();
  return <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>{now}</div>;
}

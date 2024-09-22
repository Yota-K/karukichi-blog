import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

import type { HeadersFunction } from '@remix-run/cloudflare';

export async function loader() {
  return json({ text: new Date().toUTCString() });
}

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'max-age=0, s-maxage=60, stale-while-revalidate=60',
  };
};

export default function Page() {
  const { text } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Test</h1>
      <div>stale while revalidate: {text}</div>
      <div>client side render: {new Date().toUTCString()}</div>
    </div>
  );
}

import { defer } from '@remix-run/cloudflare';
import { Await, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';

import type { HeadersFunction } from '@remix-run/cloudflare';

export async function loader() {
  const delay = (ms: number) =>
    new Promise<{ text: string }>((resolve) => {
      setTimeout(() => {
        resolve({ text: new Date().toISOString() });
      }, ms);
    });

  const res = delay(2000);
  return defer({ res });
}

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'max-age=0, s-maxage=60, stale-while-revalidate=60',
  };
};

export default function Page() {
  const { res } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Test</h1>
      <Suspense fallback={<div>loading...</div>}>
        <Await resolve={res}>{(res) => <div>{res.text}</div>}</Await>
      </Suspense>
    </div>
  );
}

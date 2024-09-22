import { defer } from '@remix-run/cloudflare';
import { Await, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';

export async function loader() {
  const delay = (ms: number) =>
    new Promise<{ text: string }>((resolve) => {
      setTimeout(() => {
        resolve({ text: 'Hello, World!' });
      }, ms);
    });

  const res = delay(5000);
  return defer(
    { res },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, max-age=0, s-maxage=0',
      },
    },
  );
}

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

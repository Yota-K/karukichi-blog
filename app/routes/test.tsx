import { defer } from '@remix-run/cloudflare';
import { Await, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';

function heavyFunction() {
  let i = 0;

  while (i < 1000000000) {
    i++;
  }
}

export async function loader() {
  const res = async () => {
    heavyFunction();
    return { contents: 'Hello, World!' };
  };
  return defer(
    { res: res() },
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
        <Await resolve={res}>{(res) => <div>{res.contents}</div>}</Await>
      </Suspense>
    </div>
  );
}

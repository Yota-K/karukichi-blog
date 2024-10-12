import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from '@remix-run/react';
import './tailwind.css';

import { rootLoader as loader } from './.server';
import { config } from './config';
import { AppFooter, AppHeader, DisplayErrorMessage } from './widgets';

import type { MetaFunction } from '@remix-run/cloudflare';
import type { ReactNode } from 'react';

export const meta: MetaFunction = () => {
  const title = config.siteTitle;
  const description = 'カルキチ副島が運営するウェブ系の技術について執筆しているブログです';
  const ogImageUrl = config.ogImageUrl();
  return [
    { title },
    {
      name: 'description',
      content: description,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:locale',
      content: 'ja_JP',
    },
    {
      property: 'og:url',
      content: 'https://karukichi-blog.com',
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: ogImageUrl,
    },
    {
      property: 'og:type',
      content: 'website',
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

export { loader };

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppHeader />
        <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-12">{children}</main>
        <AppFooter />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const getStatusCode = () => {
    if (isRouteErrorResponse(error)) {
      return error.status;
    }
  };

  const statusCode = getStatusCode();

  return <DisplayErrorMessage statusCode={statusCode} />;
}

export default function App() {
  return <Outlet />;
}

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from 'react-router';
import './tailwind.css';

import { rootLoader as loader } from './.server';
import { config } from './config';
import { AppFooter, AppHeader, DisplayErrorMessage } from './widgets';

import type { MetaFunction } from 'react-router';
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
      property: 'og:url',
      url: config.url,
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
  const gaTrackingId = 'G-Y2MDQ3RC4V';
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {
          // <!-- Global site tag (gtag.js) - Google Analytics -->
        }
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`} />
        <script
          async
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaTrackingId}', {
          page_path: window.location.pathname,
        });
      `,
          }}
        />
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

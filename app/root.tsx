import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import './tailwind.css'

import { rootLoader as loader } from './.server'

import type { MetaFunction } from '@remix-run/cloudflare'

export const meta: MetaFunction = () => {
  return [
    { title: 'カルキチブログ' },
    {
      name: 'description',
      content:
        'カルキチ副島が運営するウェブ系の技術について執筆しているブログです',
    },
  ]
}

export { loader }

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>()
  if (data?.authorized) {
    return (
      <html lang="ja">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    )
  }

  // TODO: リリース時に消す
  return <div>Unauthorized</div>
}

export default function App() {
  return <Outlet />
}

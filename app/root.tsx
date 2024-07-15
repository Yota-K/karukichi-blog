import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import './tailwind.css'

import { rootLoader as loader } from './.server'
import { Config } from './config'
import { AppFooter, AppHeader } from './features'

import type { MetaFunction } from '@remix-run/cloudflare'

export const meta: MetaFunction = () => {
  return [
    { title: Config.siteTitle },
    {
      name: 'description',
      content:
        'カルキチ副島が運営するウェブ系の技術について執筆しているブログです',
    },
  ]
}

export { loader }

export function Layout({ children }: { children: React.ReactNode }) {
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
        {children}
        <AppFooter />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

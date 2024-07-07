import { useLoaderData } from '@remix-run/react'

import { indexLoader as loader } from '../.server'
import { TopPage } from '../pages'

import type { HeadersFunction } from '@remix-run/cloudflare'

export const headers: HeadersFunction = () => {
  return {
    // TODO: キャッシュ戦略後でちゃんと考える
    'Cache-Control': 'max-age=0, s-maxage=60, stale-while-revalidate=60',
  }
}

export { loader }

export default function Index() {
  const { contents } = useLoaderData<typeof loader>()
  return <TopPage contents={contents} />
}

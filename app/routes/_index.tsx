import { useLoaderData } from '@remix-run/react'

import { indexLoader as loader } from '../.server'
import { TopPage } from '../pages'

import type { HeadersFunction } from '@remix-run/cloudflare'

export const headers: HeadersFunction = () => {
  return {
    // TODO: キャッシュ戦略後でちゃんと考える
    // - レスポンスは7日間（604800 秒間）は新鮮。
    // - 7日間経過したら、そこから 360s は、古いキャッシュを参照するが、バックグラウンドでfetchを行い、キャッシュを更新して、サーバから新しいリソースを取得できたら、キャッシュを更新する。
    // - 7日を過ぎると古くなるが、サーバーがエラーでレスポンスを返した場合はさらに1日（86400 秒間）利用できる。
    'Cache-Control':
      'max-age=0, s-maxage=604800, stale-while-revalidate=360, stale-if-error=86400',
  }
}

export { loader }

export default function Index() {
  const { contents } = useLoaderData<typeof loader>()
  return <TopPage contents={contents} />
}

import { useLoaderData } from '@remix-run/react'

import { tagLoader as loader } from '../.server'
import { Config } from '../config'
import { TagRelatedArticleListPage } from '../features'

import type { HeadersFunction, MetaFunction } from '@remix-run/cloudflare'

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control':
      'max-age=0, s-maxage=604800, stale-while-revalidate=360, stale-if-error=86400',
  }
}

export { loader }

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `${data?.tagName} | ${Config.siteTitle}` }]
}

export default function Page() {
  const { contents, tagName, totalCount } = useLoaderData<typeof loader>()
  return (
    <TagRelatedArticleListPage
      contents={contents}
      tagName={tagName}
      totalCount={totalCount}
    />
  )
}

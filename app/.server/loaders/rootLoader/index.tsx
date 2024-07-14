import { json } from '@remix-run/cloudflare'

import { validateEnv } from '../../env'


import type { LoaderFunctionArgs } from '@remix-run/cloudflare'

const isAuthorized = (request: Request) => {
  const header = request.headers.get('Authorization')
  if (!header) return false
  const base64 = header.replace('Basic ', '')
  const [username, password] = Buffer.from(base64, 'base64')
    .toString()
    .split(':')
  return username === 'test' && password === 'test'
}

export const rootLoader = async ({ request, context }: LoaderFunctionArgs) => {
  validateEnv(context.cloudflare.env)

  if (isAuthorized(request)) {
    return json({ authorized: true })
  } else {
    return json({ authorized: false }, { status: 401 })
  }

  // TODO: ページ全体に共通するデータの取得処理を実装する
  return null
}

import { json } from '@remix-run/cloudflare'

import { validateEnv } from '../../env'

import type { AppLoadContext, LoaderFunctionArgs } from '@remix-run/cloudflare'

// TODO: リリース時に消す
const isAuthorized = (request: Request, context: AppLoadContext) => {
  const header = request.headers.get('Authorization')
  if (!header) return false
  const base64 = header.replace('Basic ', '')
  const [username, password] = Buffer.from(base64, 'base64')
    .toString()
    .split(':')
  return (
    username === context.cloudflare.env.BASIC_USER &&
    password === context.cloudflare.env.BASIC_PASS
  )
}
// TODO: リリース時に消す

// TODO: ページ全体に共通するデータの取得処理を実装する
export const rootLoader = async ({ request, context }: LoaderFunctionArgs) => {
  validateEnv(context.cloudflare.env)

  if (isAuthorized(request, context)) {
    return json({ authorized: true })
  } else {
    // TODO: リリース時に消す
    return json({ authorized: false }, { status: 401 })
  }
}

import { validateEnv } from '../../env'

import type { LoaderFunctionArgs } from '@remix-run/cloudflare'

export const rootLoader = async ({ context }: LoaderFunctionArgs) => {
  validateEnv(context.cloudflare.env)

  // TODO: ページ全体に共通するデータの取得処理を実装する
  return null
}

import { auth } from '../utils'
export async function onRequest({ env, next, request }) {
  return auth({ env, next, request })
}

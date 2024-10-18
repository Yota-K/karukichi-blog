import { json } from '@remix-run/cloudflare';

import { revalidateCacheAction as action } from '../.server';

export { action };

// apiをGETで実行すると、{ "message": "Unexpected Server Error" } が発生してしまうので、エラーを回避するためにローダーを定義している。
//
// actionは、ルートに対して GET 以外のリクエスト (DELETE、PATCH、POST、または PUT) が行われた場合は、ローダーの前にアクションが呼び出される。
// ref: https://remix.run/docs/en/main/route/action#action
export const loader = async () => {
  return json({ message: 'Method Not Allowed' }, { status: 405 });
};

// Pages Functions でリクエストを受けて Remix に流すためのアダプター。
// [[path]].tsにすることで、すべてのリクエストをRemixに流す。
//
// ref: https://developers.cloudflare.com/pages/functions/routing/#dynamic-route-examples
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - the server build file is generated by `remix vite:build`
// eslint-disable-next-line import/no-internal-modules
import * as build from '../build/server';

// Pages Functions では onRequest 関数を named-export する必要がある。
// ref: https://developers.cloudflare.com/pages/functions/get-started/#create-a-function
export const onRequest = createPagesFunctionHandler({ build });

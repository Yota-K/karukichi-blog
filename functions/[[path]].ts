import { createPagesFunctionHandler } from '@react-router/cloudflare';
import * as build from '../build/server';

/**
 * キャッシュ可能なリクエストかどうかを判定する
 */
const isCacheableRequest = (url: URL, method: string): boolean => {
  if (method !== 'GET') return false;

  const cacheablePaths = ['/', '/tags', '/articles'] as const;
  return cacheablePaths.some((path) => url.pathname === path || url.pathname.startsWith(`${path}/`));
};

/**
 * kvとCDNのキャッシュを消すAPIへのリクエストかどうかを判定する
 **/
const isRevalidateCacheRequest = (url: URL, method: string): boolean => {
  return method === 'POST' && url.pathname === '/api/revalidate-cache';
};

/**
 * 記事ページのWorkers Cacheを削除する
 **/
const purgeArticleCache = async (
  cache: Cache,
  postId: string,
  waitUntil: (promise: Promise<unknown>) => void,
): Promise<void> => {
  const siteOrigin = 'https://karukichi-blog.com';
  const urls = [`${siteOrigin}/articles/${postId}`, `${siteOrigin}/articles/${postId}.data`];

  waitUntil(
    Promise.all(urls.map((url) => cache.delete(new Request(url)))).then((results) => {
      console.info('Purge Workers Cache API:', urls, results);
    }),
  );
};

// @ts-ignore - サーバーのビルドファイルは `remix vite:build` によって生成されるので、tsconfig.jsonでも型チェックを無効にしている。
const remixHandler = createPagesFunctionHandler({ build });

export const onRequest = async (context: Parameters<typeof remixHandler>[0]) => {
  const request = context.request;
  const url = new URL(request.url);

  // cloudflare workersのCacheオブジェクトにアクセスする。
  // @ts-expect-error - ref: https://developers.cloudflare.com/workers/runtime-apis/cache/#accessing-cache
  const cache = caches.default as Cache;

  // revalidate-cache APIが実行された場合、Workers Cache APIも削除する
  // NOTE: React Routerは画面遷移時にはHTMLを取得せず、loaderの結果を'.data'から取得する挙動になる。
  // キャッシュを消すAPIでは、CDNのキャッシュは消せても、Workers Cache内の'.data'が残ってしまい、
  // 古いデータが表示されてしまう問題があるため、Workers Cache内の該当記事のキャッシュも削除している。
  if (isRevalidateCacheRequest(url, request.method)) {
    const clonedRequest = request.clone();
    const response = await remixHandler(context);

    if (response.status === 200) {
      try {
        const body = await clonedRequest.json<{ id?: string }>();
        if (body.id) {
          await purgeArticleCache(cache, body.id, context.waitUntil);
        }
      } catch {
        console.error('Failed to parse revalidate-cache request body');
      }
    }

    return response;
  }

  if (!isCacheableRequest(url, request.method)) {
    return remixHandler(context);
  }

  try {
    const cacheKey = new Request(url.toString());

    // キャッシュヒットした場合はWorker処理をスキップして即返却
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await remixHandler(context);

    if (response.status === 200) {
      const responseToCache = new Response(response.clone().body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers),
      });

      const cacheTtlSeconds = 900;
      responseToCache.headers.set('Cache-Control', `public, s-maxage=${cacheTtlSeconds}`);

      // キャッシュミスした場合はRemixのhandlerを呼び出し、レスポンスをキャッシュに保存
      context.waitUntil(cache.put(cacheKey, responseToCache));
    }

    return response;
  } catch {
    return remixHandler(context);
  }
};

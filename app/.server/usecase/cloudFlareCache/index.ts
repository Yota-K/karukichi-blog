import { cloudFlareCacheRepository } from '../../repository';

export const cloudFlareCacheUsecase = {
  /**
   * Workers Cache API (caches.default) のキャッシュを削除する
   */
  purgeWorkersCacheApi: async (path: string): Promise<boolean> => {
    return cloudFlareCacheRepository.purgeWorkersCacheApi(path);
  },

  /**
   * CloudFlareのCDN上のキャッシュを削除する
   */
  purgeCdnCache: async (
    apiToken: string,
    zoneId: string,
    path: string,
  ): Promise<ReturnType<typeof cloudFlareCacheRepository.purgeCdnCache>> => {
    const res = await cloudFlareCacheRepository.purgeCdnCache(apiToken, zoneId, path);
    if (!res) return undefined;
    return res;
  },
};

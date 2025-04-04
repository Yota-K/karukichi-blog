import { cloudFlareCacheRepository } from '../../repository';

export const cloudFlareCacheUsecase = {
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

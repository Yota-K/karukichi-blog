import { config } from '../../../config';

type PurgeCacheResponse = {
  success: boolean;
  errors: {
    code?: number;
    message?: string;
  }[];
  messages: string[];
  result: {
    id: string;
  } | null;
};

export const cloudFlareCacheRepository = {
  purgeCdnCache: async (apiToken: string, zoneId: string, path: string): Promise<PurgeCacheResponse | undefined> => {
    const endpoint = `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`;
    const payload = {
      files: [`${config.url}/${path}`],
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}, ${await response.text()}`);
      }

      const data = (await response.json()) as PurgeCacheResponse;

      //eslint-disable-next-line no-console
      console.info('Purge CDN cache response:', data);

      return data;
    } catch (error) {
      console.error('Failed to purge cache:', error);
    }
  },
};

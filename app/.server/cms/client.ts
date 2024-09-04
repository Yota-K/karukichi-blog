import { createClient } from 'microcms-js-sdk';

export const serviceDomain = 'karukichi-tech-blog';

export const client = (apiKey: Env['CMS_API_KEY']) =>
  createClient({
    serviceDomain,
    apiKey,
  });

export type ClientType = ReturnType<typeof client>;

import { createClient } from 'microcms-js-sdk';

export const client = (apiKey: Env['CMS_API_KEY']) =>
  createClient({
    serviceDomain: 'karukichi-tech-blog',
    apiKey,
  });

export type ClientType = ReturnType<typeof client>;

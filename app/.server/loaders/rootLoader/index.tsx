import { validateEnv } from '../../env';

import type { LoaderFunctionArgs } from '@remix-run/cloudflare';

type LoaderResponse = Promise<null>;

export const rootLoader = async ({ context }: LoaderFunctionArgs): LoaderResponse => {
  validateEnv(context.cloudflare.env);

  return null;
};

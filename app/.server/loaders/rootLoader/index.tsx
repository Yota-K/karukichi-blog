import { validateEnv } from '../../env';

import type { LoaderFunctionArgs } from '@remix-run/cloudflare';

export const rootLoader = async ({ context }: LoaderFunctionArgs) => {
  validateEnv(context.cloudflare.env);

  return null;
};

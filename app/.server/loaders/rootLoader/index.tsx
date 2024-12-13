import { validateEnv } from '../../env';

import type { LoaderFunctionArgs } from 'react-router';

type LoaderResponse = Promise<null>;

export const rootLoader = async ({ context }: LoaderFunctionArgs): LoaderResponse => {
  console.log(context);
  validateEnv(context.cloudflare.env);

  return null;
};

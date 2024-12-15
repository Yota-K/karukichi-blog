declare module 'react-router' {
  // Your AppLoadContext used in v2
  interface AppLoadContext {
    cloudflare: {
      env: {
        CMS_API_KEY: string;
        RECAPTCHA_KEY: string;
        REVALIDATE_CACHE_API_KEY: string;
        RESPONSE_CACHE_KV: KVNamespace;
        CLOUD_FLARE_API_TOKEN: string;
        CLOUD_FLARE_ZONE_ID: string;
      };
    };
  }
}

export {}; // necessary for TS to treat this as a module

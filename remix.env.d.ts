interface Env extends z.infer<typeof serverSchema> {
  CMS_API_KEY: string;
  RECAPTCHA_KEY: string;
  REVALIDATE_CACHE_API_KEY: string;
  RESPONSE_CACHE_KV: KVNamespace;
}

interface Env extends z.infer<typeof serverSchema> {
  CMS_API_KEY: string;
  RECAPTCHA_KEY: string;
}

interface Env extends z.infer<typeof serverSchema> {
  CMS_API_KEY: string
  RECAPTCHA_KEY: string
  // TODO: リリース時に消す
  BASIC_USER: string
  BASIC_PASS: string
  // TODO: リリース時に消す
}

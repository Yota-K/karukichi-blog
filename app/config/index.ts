export const Config = {
  siteTitle: 'カルキチブログ',
  paginateLimit: 10,
} as const satisfies {
  siteTitle: string
  paginateLimit: number
}

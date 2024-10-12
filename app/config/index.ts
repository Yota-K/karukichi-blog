export const config = {
  siteTitle: 'カルキチブログ',
  ogImageUrl: (title?: string) =>
    `https://images.microcms-assets.io/assets/a1b0a00f12674fdaaf05fbe85c44b8be/143f04a316184b46acfbc589fa407f63/ogp.png?usm=20&fit=crop&blend-mode=normal&blend-alpha=100&?blend-align=middle.center&blend-w=1.0&blend=https%3A%2F%2Fassets.imgix.net%2F~text%3Ftxt%3D+${title ?? config.siteTitle}+%26txt-color%3D000000%26width%3D1000%26txt-align%3Dcenter%26txtfont=Hiragino%20Sans%20W6%26txt-size%3D32`,
  paginateLimit: 10,
} as const;

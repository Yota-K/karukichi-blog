import type { Content } from '../types';

export const contentsMock: Content[] = [
  {
    id: 'test-1',
    createdAt: '2023-12-31T10:29:48.466Z',
    updatedAt: '2023-12-31T05:23:12.907Z',
    publishedAt: '2023-12-30T16:48:37.058Z',
    revisedAt: '2023-12-31T05:23:12.907Z',
    title: 'title1',
    type: 'cms',
    thumbnail: {
      url: 'https://images.microcms-assets.io/assets/hoge.png',
      height: 360,
      width: 640,
    },
    body: '<h2>heading</h2><p>テキストテキストテキストテキストテキストテキストテキストテキストテキスト。<br />テキストテキストテキストテキストテキストテキストテキストテキストテキスト。</p><ul><li>テキストテキストテキスト</li><li>テキストテキストテキスト</li><li>テキストテキストテキスト</li></ul><p>テキストテキストテキストテキストテキストテキストテキストテキストテキスト</p><blockquote class="twitter-tweet"><p lang="ja" dir="ltr">職場の近くのハンバーガー屋さん美味しかった <a href="https://t.co/7wXHx5jtyG">pic.twitter.com/7wXHx5jtyG</a></p>&mdash; カルキチ 副島｜Karukichi Soejima (@karukichi_yah) <a href="https://twitter.com/karukichi_yah/status/1397426456771268608?ref_src=twsrc%5Etfw">May 26, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script><h3>sub heading</h3><img src="https://placehold.jp/768x500.png" alt="image" /><p>test</p>',
    description: 'text text text text text text',
    category_field: {
      id: 'others',
      createdAt: '2020-05-19T13:33:13.468Z',
      updatedAt: '2023-12-30T16:49:13.911Z',
      name: 'その他もろもろ',
      posts: [
        {
          id: 'first-blog',
        },
        {
          id: 'concentration',
        },
        {
          id: 'wordpress-level',
        },
      ],
    },
    tag_field: [
      {
        id: 'javascript',
        createdAt: '2020-04-30T07:01:21.936Z',
        updatedAt: '2023-12-30T16:49:34.476Z',
        name: 'JavaScript',
        posts: [
          {
            id: 'test',
          },
        ],
      },
      {
        id: 'react',
        createdAt: '2020-04-30T07:01:21.936Z',
        updatedAt: '2023-12-30T16:49:34.476Z',
        name: 'React',
        posts: [
          {
            id: 'test',
          },
        ],
      },
    ],
  },
  {
    id: 'test-2',
    createdAt: '2023-12-30T10:29:48.466Z',
    updatedAt: '2023-12-31T05:23:12.907Z',
    publishedAt: '2023-12-30T16:48:37.058Z',
    revisedAt: '2023-12-31T05:23:12.907Z',
    title: 'title2',
    type: 'cms',
    thumbnail: {
      url: 'https://images.microcms-assets.io/assets/hoge.png',
      height: 360,
      width: 640,
    },
    body: '<p>test</p>',
    description: 'text text text text text text',
    category_field: {
      id: 'others',
      createdAt: '2020-05-19T13:33:13.468Z',
      updatedAt: '2023-12-30T16:49:13.911Z',
      name: 'その他もろもろ',
      posts: [
        {
          id: 'first-blog',
        },
        {
          id: 'concentration',
        },
        {
          id: 'wordpress-level',
        },
      ],
    },
    tag_field: [
      {
        id: 'everyday',
        createdAt: '2020-04-28T07:01:21.936Z',
        updatedAt: '2023-12-30T16:49:34.476Z',
        name: '日常',
        posts: [
          {
            id: 'first-blog',
          },
          {
            id: 'concentration',
          },
          {
            id: '2021-look-back',
          },
          {
            id: 'japan-it-week-autumn-2022',
          },
          {
            id: 'looking-back-2023',
          },
        ],
      },
    ],
  },
  {
    id: 'test-3',
    createdAt: '2023-12-29T10:29:48.466Z',
    updatedAt: '2023-12-31T05:23:12.907Z',
    publishedAt: '2023-12-30T16:48:37.058Z',
    revisedAt: '2023-12-31T05:23:12.907Z',
    title: 'title3',
    type: 'cms',
    thumbnail: {
      url: 'https://images.microcms-assets.io/assets/hoge.png',
      height: 360,
      width: 640,
    },
    body: '<p>test</p>',
    description: 'text text text text text text',
    category_field: {
      id: 'others',
      createdAt: '2020-05-19T13:33:13.468Z',
      updatedAt: '2023-12-30T16:49:13.911Z',
      name: 'その他もろもろ',
      posts: [
        {
          id: 'first-blog',
        },
        {
          id: 'concentration',
        },
        {
          id: 'wordpress-level',
        },
      ],
    },
    tag_field: [
      {
        id: 'everyday',
        createdAt: '2020-04-30T07:01:21.936Z',
        updatedAt: '2023-12-30T16:49:34.476Z',
        name: '日常',
        posts: [
          {
            id: 'first-blog',
          },
          {
            id: 'concentration',
          },
          {
            id: '2021-look-back',
          },
          {
            id: 'japan-it-week-autumn-2022',
          },
          {
            id: 'looking-back-2023',
          },
        ],
      },
    ],
  },
  {
    id: 'test-4',
    createdAt: '2023-12-28T10:29:48.466Z',
    updatedAt: '2023-12-31T05:23:12.907Z',
    publishedAt: '2023-12-30T16:48:37.058Z',
    revisedAt: '2023-12-31T05:23:12.907Z',
    title: 'title4',
    type: 'cms',
    thumbnail: {
      url: 'https://images.microcms-assets.io/assets/hoge.png',
      height: 360,
      width: 640,
    },
    body: '<p>test</p>',
    description: 'text text text text text text',
    category_field: {
      id: 'others',
      createdAt: '2020-05-19T13:33:13.468Z',
      updatedAt: '2023-12-30T16:49:13.911Z',
      name: 'その他もろもろ',
      posts: [
        {
          id: 'first-blog',
        },
        {
          id: 'concentration',
        },
        {
          id: 'wordpress-level',
        },
      ],
    },
    tag_field: [
      {
        id: 'everyday',
        createdAt: '2020-04-30T07:01:21.936Z',
        updatedAt: '2023-12-30T16:49:34.476Z',
        name: '日常',
        posts: [
          {
            id: 'first-blog',
          },
          {
            id: 'concentration',
          },
          {
            id: '2021-look-back',
          },
          {
            id: 'japan-it-week-autumn-2022',
          },
          {
            id: 'looking-back-2023',
          },
        ],
      },
    ],
  },
];

export const contentMock = contentsMock[0];

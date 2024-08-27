import { describe, expect, it } from 'vitest';

import { generateMockContentListResponse } from '../../../../__helpers__/';
import { filterAndAssignServiceUrlToPosts } from '../filterAndAssignServiceUrlToPosts';

const mockContentList = generateMockContentListResponse({
  overrideContents: [
    {
      id: 'test-1',
      createdAt: '2023-12-29T10:29:48.466Z',
      updatedAt: '2023-12-31T05:23:12.907Z',
      publishedAt: '2023-12-30T16:48:37.058Z',
      revisedAt: '2023-12-31T05:23:12.907Z',
      title: 'title-1',
      body: '<p><a href="https://qiita.com/username/items/1234567890abcdef">https://qiita.com/username/items/1234567890abcdef</a></p>',
      type: ['qiita'],
    },
    {
      id: 'test-2',
      createdAt: '2023-12-29T10:29:48.466Z',
      updatedAt: '2023-12-31T05:23:12.907Z',
      publishedAt: '2023-12-30T16:48:37.058Z',
      revisedAt: '2023-12-31T05:23:12.907Z',
      title: 'title-2',
      type: ['cms'],
    },
    {
      id: 'test-3',
      createdAt: '2023-12-29T10:29:48.466Z',
      updatedAt: '2023-12-31T05:23:12.907Z',
      publishedAt: '2023-12-30T16:48:37.058Z',
      revisedAt: '2023-12-31T05:23:12.907Z',
      title: 'title-3',
      body: '<p><a href="https://qiita.com/username/items/1234567890abcdef">https://qiita.com/username/items/1234567890abcdef</a></p>',
      type: ['qiita'],
    },
  ],
});

describe(filterAndAssignServiceUrlToPosts, () => {
  const filteredPosts = filterAndAssignServiceUrlToPosts(mockContentList);

  it('投稿タイプがcms以外の場合はサービスのURLをbodyから取得してidに設定できる', () => {
    expect(filteredPosts.contents[0].id).toBe('https://qiita.com/username/items/1234567890abcdef');
  });

  it('投稿タイプがcmsの場合はidが上書きされない', () => {
    expect(filteredPosts.contents[1].id).toBe('test-2');
  });
});

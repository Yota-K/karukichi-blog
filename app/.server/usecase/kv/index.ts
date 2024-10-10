import { kvRepository } from '../../repository';

import { schema } from './schema';

export const kvUseCase = {
  /**
   * kvのキャッシュを削除する
   */
  revalidateCache: async (kv: KVNamespace<string>, bodyText: string): Promise<string | undefined> => {
    const convertToObj = JSON.parse(bodyText);

    // eslint-disable-next-line no-console
    console.log('convertToObj:', convertToObj);

    // microCMSのwebhookのリクエストには更新対象の記事データが含まれているので、リクエストボディに含まれるコンテンツ情報を取得して、パースする
    // - ref: https://document.microcms.io/manual/webhook-setting#h9f84bd737e
    const parsedBody = schema.safeParse(convertToObj);

    // eslint-disable-next-line no-console
    console.log('parsedBody:', parsedBody);

    if (!parsedBody.success) return undefined;

    const { type, id: contentId, contents } = parsedBody.data;

    // 投稿タイプがcmsの場合のみ、キャッシュを削除する
    if (type === 'edit' && contentId !== null && contents?.new?.publishValue.type === 'cms') {
      await kvRepository.deletePostDetailCache(kv, contentId);
      return contentId;
    }

    return undefined;
  },
};

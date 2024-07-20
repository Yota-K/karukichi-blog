import { z } from 'zod';

// 一覧には20件表示する仕様のため、?page=100でリクエストされた場合100 * 10 - 10 = 990件目から取得することになる。
// 990件近く記事が増えることは当分ないと思うので、上限値を100にセットしている。
const requestPaginateQueryParamsLimit = 100 as const;

export const paginateSchema = z
  .string()
  .optional()
  .refine((val) => {
    const parsedNumber = Number(val);
    return (
      !isNaN(parsedNumber) && // 数字に変換できることを確認
      Number.isInteger(parsedNumber) && // 整数かどうかチェック
      parsedNumber > 0 && // 正の数かどうかチェック
      parsedNumber <= requestPaginateQueryParamsLimit // 100以下かどうかチェック
    );
  })
  .transform((val) => Number(val));

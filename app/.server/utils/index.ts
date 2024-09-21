/**
 * アクセスした URI とポートの情報がローカル環境かどうかをチェックする
 */
export const checkHost = (host: string | null): boolean => {
  return Boolean(host?.includes('localhost:5173'));
};

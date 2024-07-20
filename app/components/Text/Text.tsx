// TODO: 後で色とかpropsとか見直す
// 色はテーマとかで一元管理するような設計にしたい
export function Text({ children }: { children: React.ReactNode }) {
  return <p className="text-base text-gray-900">{children}</p>;
}

import type { data } from 'react-router';

// NOTE: react-router v7で、明示的なローダー/アクションの戻り値の型を生成するための、TypedResponse が廃止されたので、
// data関数から型を生成する関数を自前実装している
//
// https://github.com/remix-run/remix/discussions/10244
export type DataWithResponseInit<T> = ReturnType<typeof data<T>>;

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return <div className="flex flex-col gap-6">{children}</div>;
};

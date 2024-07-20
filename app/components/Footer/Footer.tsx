import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Footer = ({ children }: Props) => {
  return <footer className="p-4">{children}</footer>;
};

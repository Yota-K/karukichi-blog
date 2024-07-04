import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Header = ({ children }: Props) => {
  return <header className="bg-headerBlue-background p-4">{children}</header>
}

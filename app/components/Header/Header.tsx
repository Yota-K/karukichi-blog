import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Header = ({ children }: Props) => {
  return <header className="p-4 bg-blue-headerBlue">{children}</header>
}

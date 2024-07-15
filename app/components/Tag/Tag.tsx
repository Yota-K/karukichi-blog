import { Link } from '../Link'

import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  to: string
}>

export const Tag = ({ children, to }: Props) => {
  return (
    <Link
      to={to}
      className="rounded-lg border border-blue-primary px-2 py-1 leading-none text-blue-primary transition-colors hover:bg-blue-primary hover:text-white"
    >
      {children}
    </Link>
  )
}

import { Link as RemixLink } from '@remix-run/react'

import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof RemixLink>

export const Link = ({ to, children, ...rest }: Props) => {
  return (
    <RemixLink to={to} {...rest}>
      {children}
    </RemixLink>
  )
}

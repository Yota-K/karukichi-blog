import { Link as RemixLink } from 'react-router';

import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof RemixLink>;

export const Link = ({ to, children, ...rest }: Props) => {
  return (
    <RemixLink to={to} {...rest}>
      {children}
    </RemixLink>
  );
};

import { cva } from 'class-variance-authority'

import type { VariantProps } from 'class-variance-authority'
import type { HtmlHTMLAttributes } from 'react'

const heading = cva('text-gray-900 font-bold ', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-2xl',
      xl: 'text-3xl',
    },
    defaultVariants: {
      size: 'md',
    },
  },
})

type BaseProps = HtmlHTMLAttributes<HTMLHeadingElement> & {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
// 公式のサンプルがinterface 使っていたので、interface使う
// https://github.com/joe-bell/cva/blob/main/examples/react-with-tailwindcss/src/components/button/button.tsx
interface Props extends BaseProps, VariantProps<typeof heading> {}

export const Heading = ({
  as = 'h1',
  size = 'md',
  className,
  children,
  ...rest
}: Props) => {
  const TagName = as ?? 'h1'
  return (
    <TagName className={heading({ size, className })} {...rest}>
      {children}
    </TagName>
  )
}

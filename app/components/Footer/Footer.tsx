type Props = {
  siteTitle: string
}

export const Footer = ({ siteTitle }: Props) => {
  return (
    <footer className="p-4">
      © 2020〜{new Date().getFullYear()} {siteTitle}
    </footer>
  )
}

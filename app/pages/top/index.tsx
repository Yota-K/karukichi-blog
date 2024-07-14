import { Heading, Link } from '../../components'

import type { Content } from '../../types'

type Props = {
  contents: Content[]
}

export const TopPage = ({ contents }: Props) => {
  return (
    <div className="p-4 font-sans">
      {contents.map((content) => (
        <div key={content.id}>
          <Link to={`/articles/${content.id}`}>
            <Heading as="h2" size="lg">
              {content.title}
            </Heading>
          </Link>
        </div>
      ))}
    </div>
  )
}

import { Heading, Link } from '../../../../components'
import { dateFormat } from '../../../../utils'

import type { Content } from '../../../../types'

type Props = {
  content: Content
}

export const PostItem = ({ content }: Props) => {
  return (
    <div>
      <time itemProp="dateCreated" dateTime={dateFormat(content.createdAt)}>
        {dateFormat(content.createdAt)}
      </time>
      <Link
        to={`/articles/${content.id}`}
        className="relative block cursor-pointer transition-all ease-in-out before:absolute before:bottom-0 before:left-1/2 before:h-px before:w-0 before:origin-center before:bg-gray-400 before:transition-[width] before:duration-700 before:ease-in-out after:absolute after:bottom-0 after:right-1/2 after:h-px after:w-0 after:origin-center after:bg-gray-400 after:transition-[width] after:duration-700 after:ease-in-out hover:text-gray-400 hover:before:w-1/2 hover:after:w-1/2"
      >
        <Heading as="h2" size="lg">
          {content.title}
        </Heading>
      </Link>
      <div className="mt-2">
        {/* TODO: タグは後で実装する */}
        {content.tag_field.map((tag) => (
          <Link key={tag.id} to="/">
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

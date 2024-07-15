import { Heading } from '../../../components'
import { PostList } from '../components'

import type { Content } from '../../../types'

type Props = {
  tagName?: string
  contents: Content[]
}

export const TagRelatedArticleListPage = ({ contents, tagName }: Props) => {
  return (
    <div>
      {tagName && (
        <Heading as="h1" size="lg" className="mb-8">
          タグ: {tagName}
        </Heading>
      )}
      <PostList contents={contents} />
    </div>
  )
}

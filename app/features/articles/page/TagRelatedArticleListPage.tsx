import { Heading } from '../../../components'
import { PostList } from '../components'

import type { Content } from '../../../types'

type Props = {
  contents: Content[]
  tagName?: string
  totalCount: number
}

export const TagRelatedArticleListPage = ({ contents, tagName }: Props) => {
  return (
    <div>
      {tagName && (
        <div className="mb-8 flex justify-between">
          <Heading as="h1" size="lg">
            {tagName}
          </Heading>
          <Heading as="h2" size="lg">
            {`${contents.length}件`}
          </Heading>
        </div>
      )}
      <PostList contents={contents} />
    </div>
  )
}

import { PostList } from '../components'

import type { Content } from '../../../types'

type Props = {
  contents: Content[]
}

export const ArticleListPage = ({ contents }: Props) => {
  return <PostList contents={contents} />
}

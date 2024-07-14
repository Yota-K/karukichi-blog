import { Heading } from '../../../components'

import type { Content } from '../../../types'
import type { SerializeFrom } from '@remix-run/cloudflare'

type Props = {
  content: SerializeFrom<Content>
}

export const ArticleDetailPage = ({ content }: Props) => {
  return (
    <div>
      <Heading as="h1">{content.title}</Heading>
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
    </div>
  )
}

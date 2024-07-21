import { Heading } from '../../../components';
import { dateFormat } from '../../../utils';
import { ContentBody, TagArea } from '../components';

import type { Content } from '../../../types';
import type { SerializeFrom } from '@remix-run/cloudflare';

type Props = {
  content: SerializeFrom<Content>;
};

export const ArticleDetailPage = ({ content }: Props) => {
  return (
    <div>
      <Heading as="h1" size="xl">
        {content.title}
      </Heading>
      <time itemProp="dateCreated" dateTime={dateFormat(content.createdAt)}>
        {dateFormat(content.createdAt)}
      </time>
      <TagArea tagField={content.tag_field} />
      <ContentBody body={content.body} />
    </div>
  );
};

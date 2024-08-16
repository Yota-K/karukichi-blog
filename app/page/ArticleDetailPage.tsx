import { Heading } from '../components';
import { ContentBody, TagArea, Toc } from '../features';
import { dateFormat } from '../utils';

import type { Content, Toc as TocType } from '../types';
import type { SerializeFrom } from '@remix-run/cloudflare';

type Props = {
  content: SerializeFrom<
    Content & {
      toc: TocType[];
    }
  >;
};

export const ArticleDetailPage = ({ content }: Props) => {
  return (
    <div>
      <Heading as="h1" size="xl">
        {content.title}
      </Heading>
      <div className="mb-4 flex flex-col gap-2">
        <time itemProp="dateCreated" dateTime={dateFormat(content.createdAt)}>
          {dateFormat(content.createdAt)}
        </time>
        <TagArea tagField={content.tag_field} />
      </div>
      <Toc toc={content.toc} />
      <ContentBody body={content.body} />
    </div>
  );
};

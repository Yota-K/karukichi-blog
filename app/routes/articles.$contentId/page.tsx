import { Heading, MainLayout } from '../../components';
import { ContentBody, TagArea, Toc } from '../../features';
import { dateFormat } from '../../utils';

import type { Content } from '../../schema';
import type { Toc as TocType } from '../../types';

type Props = {
  content: Content & {
    toc: TocType[];
  };
};

export const ArticleDetailPage = ({ content }: Props) => {
  return (
    <MainLayout>
      <Heading as="h1" size="xl">
        {content.title}
      </Heading>
      <div className="mb-4 flex flex-col gap-2">
        <time itemProp="dateCreated" dateTime={dateFormat(content.createdAt)}>
          {dateFormat(content.createdAt)}
        </time>
        <TagArea tagField={content.tag_field} />
      </div>
      {/* gap-4 が gap: 1rem; になるので、calc(78%-1rem) を指定して、gapで指定した余白の幅を引いている */}
      <div className="block gap-4 lg:grid lg:grid-cols-[calc(78%-1rem)_22%]">
        <ContentBody body={content.body} />
        <Toc toc={content.toc} />
      </div>
    </MainLayout>
  );
};

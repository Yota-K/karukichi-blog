import { Heading } from '../../../components';
import { ContentBody } from '../components';

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
      <ContentBody body={content.body} />
    </div>
  );
};

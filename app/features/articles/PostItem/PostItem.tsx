import { Heading, Link } from '../../../components';
import { dateFormat } from '../../../utils';
import { TagArea } from '../TagArea';

import type { Content } from '../../../schema';
import type { PropsWithChildren } from 'react';

type LinkWrapperProps = PropsWithChildren<{
  type: Content['type'];
  id: Content['id'];
}>;

const LinkWrapper = ({ type, id, children }: LinkWrapperProps) => {
  const isCms = type.includes('cms');
  return (
    <Link
      to={isCms ? `/articles/${id}` : id}
      className="relative block cursor-pointer transition-all ease-in-out before:absolute before:bottom-0 before:left-1/2 before:h-px before:w-0 before:origin-center before:bg-blue-secondary before:transition-[width] before:duration-700 before:ease-in-out after:absolute after:bottom-0 after:right-1/2 after:h-px after:w-0 after:origin-center after:bg-blue-secondary after:transition-[width] after:duration-700 after:ease-in-out hover:text-gray-400 hover:before:w-1/2 hover:after:w-1/2"
      target={isCms ? undefined : '_blank'}
      rel={isCms ? undefined : 'noopener noreferrer'}
    >
      {children}
    </Link>
  );
};

type Props = {
  content: Content;
};

export const PostItem = ({ content }: Props) => {
  return (
    <div>
      <time itemProp="dateCreated" dateTime={dateFormat(content.createdAt)}>
        {dateFormat(content.createdAt)}
      </time>
      <LinkWrapper type={content.type} id={content.id}>
        <Heading as="h2" size="md">
          {content.title}
        </Heading>
      </LinkWrapper>
      <div className="mt-2">
        <TagArea tagField={content.tag_field} />
      </div>
    </div>
  );
};

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-scroll';

import type { Toc as TocType } from '../../../types';

const tocItemClassNameObj = {
  h3: 'toc-h3',
  h4: 'toc-h4',
} as const;

/**
 * 目次の段落のスタイルを動的に生成する
 * h2の時は段落は不要なので、空文字を返す
 */
const tocItemClassName = (tagName: string) => {
  if (tagName === 'h3' || tagName === 'h4') {
    return tocItemClassNameObj[tagName];
  }
  return '';
};

type Props = {
  toc: TocType[];
};

export const Toc = ({ toc }: Props) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleScroll = (id: string) => {
    setActiveId(id);
    navigate({
      hash: `#${id}`,
    });
  };

  return (
    <nav id="toc" aria-label="目次" className="hidden lg:block">
      <ul className="sticky top-0 leading-6">
        {toc.map((item) => (
          <li key={item.id} className={`py-1 leading-5 ${tocItemClassName(item.tagName)}`}>
            <Link
              to={item.id}
              smooth={true}
              offset={-70}
              duration={600}
              onClick={() => handleScroll(item.id)}
              className={`cursor-pointer font-bold ${activeId === item.id ? 'text-gray-900' : 'text-gray-400'}`}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

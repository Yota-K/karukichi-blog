import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-scroll';

import { useActiveHeading } from './useActiveHeading';

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

const SCROLL_DURATION_MS = 600;
const CLICK_HIGHLIGHT_DURATION_MS = SCROLL_DURATION_MS + 100;
const HEADING_TOP_OFFSET = -70;

type Props = {
  toc: TocType[];
};

export const Toc = ({ toc }: Props) => {
  const [clickedId, setClickedId] = useState<string | null>(null);
  const scrollActiveId = useActiveHeading({ topOffset: HEADING_TOP_OFFSET });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleClick = (id: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setClickedId(id);
    navigate({
      hash: `#${id}`,
    });

    timerRef.current = setTimeout(() => {
      setClickedId(null);
    }, CLICK_HIGHLIGHT_DURATION_MS);
  };

  const activeId = clickedId ?? scrollActiveId;

  return (
    <nav id="toc" aria-label="目次" className="hidden lg:block">
      <ul className="sticky top-0 leading-6">
        {toc.map((item) => (
          <li key={item.id} className={`py-1 leading-5 ${tocItemClassName(item.tagName)}`}>
            <Link
              to={item.id}
              smooth={true}
              offset={HEADING_TOP_OFFSET}
              duration={SCROLL_DURATION_MS}
              onClick={() => handleClick(item.id)}
              className={`cursor-pointer font-bold ${activeId === item.id ? 'text-blue-primary' : 'text-gray-400'}`}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

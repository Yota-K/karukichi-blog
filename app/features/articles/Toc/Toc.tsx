import { useNavigate } from '@remix-run/react';
import { Link } from 'react-scroll';

import type { Toc as TocType } from '../../../types';

type Props = {
  toc: TocType[];
};

export const Toc = ({ toc }: Props) => {
  const navigate = useNavigate();

  const handleScroll = (id: string) => {
    navigate({
      hash: `#${id}`,
    });
  };

  return (
    <ul className="border-t-8 border-t-blue-primary bg-gray-100 p-2 leading-6 shadow-md">
      {toc.map((item) => (
        <li key={item.id} className="ml-4 list-disc">
          <Link
            to={item.id}
            smooth={true}
            offset={-70}
            duration={600}
            onClick={() => handleScroll(item.id)}
            className="cursor-pointer"
          >
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

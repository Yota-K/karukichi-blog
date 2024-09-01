import { FaGithub } from 'react-icons/fa';
import { FaSpeakerDeck, FaXTwitter } from 'react-icons/fa6';

import LogoImage from '../../../../public/icon.png';
import { Heading, Link, Text } from '../../../components';

export const ProfileArea = () => {
  const iconList: {
    icon: JSX.Element;
    href: string;
  }[] = [
    {
      icon: <FaGithub size={20} />,
      href: 'https://github.com/Yota-K',
    },
    {
      icon: <FaXTwitter size={20} />,
      href: 'https://twitter.com/karukichi_yah',
    },
    {
      icon: <FaSpeakerDeck size={20} />,
      href: 'https://speakerdeck.com/soejima0124',
    },
  ];

  return (
    <section className="mb-12">
      <Heading as="h2" size="lg">
        Profile
      </Heading>
      <div className="my-4">
        <Heading as="h3" size="md">
          Karukichi Soejima
        </Heading>
        <img
          src={LogoImage}
          alt="プロフィール画像"
          className="m-auto inline-block rounded-full border border-gray-500 bg-white"
          width={80}
        />
      </div>
      <div className="my-4">
        <Text>東京都で活動するウェブ開発者です。</Text>
        <Text>ウェブ開発・ウェブ制作に関する情報を発信しています。</Text>
        <Link
          to="https://karukichi-portfolio.vercel.app/"
          className="font-bold text-blue-secondary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          ✏️ Show Profile
        </Link>
      </div>
      <div className="flex gap-2">
        {iconList.map(({ icon, href }) => (
          <Link key={href} to={href} target="_blank" rel="noopener noreferrer" className="hover:opacity-50">
            {icon}
          </Link>
        ))}
      </div>
    </section>
  );
};

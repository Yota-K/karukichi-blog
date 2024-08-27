import LogoImage from '../../../../public/icon.png';
import { Heading, Link, Text } from '../../../components';

export const ProfileArea = () => {
  return (
    <section>
      <Heading as="h2" size="lg" className="mb-4">
        Profile
      </Heading>
      <div className="flex justify-between">
        <div>
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
        <img
          src={LogoImage}
          alt="プロフィール画像"
          className="rounded-full border border-gray-500 bg-white"
          width={100}
        />
      </div>
    </section>
  );
};

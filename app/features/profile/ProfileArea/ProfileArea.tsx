// TODO: ignoreする
// eslint-disable-next-line import/no-internal-modules
import LogoImage from '../../../../public/icon.png';
import { Heading, Text } from '../../../components';

export const ProfileArea = () => {
  return (
    <section>
      <Heading as="h1" size="lg">
        Profile
      </Heading>
      <div className="mt-4 flex justify-between">
        <div>
          <Text>東京都で活動するウェブ開発者です。</Text>
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

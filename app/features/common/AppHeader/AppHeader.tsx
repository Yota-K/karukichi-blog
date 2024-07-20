import { Heading, Link, Header as UiHeader } from '../../../components';
import { Config } from '../../../config';

export const AppHeader = () => {
  return (
    <UiHeader>
      <Link to="/" className="inline-block">
        <Heading as="h1" size="xl" className="text-white">
          {Config.siteTitle}
        </Heading>
      </Link>
    </UiHeader>
  );
};

import { Heading, Link, Header as UiHeader } from '../../components';
import { config } from '../../config';

export const AppHeader = () => {
  return (
    <UiHeader>
      <Link to="/" className="inline-block">
        <Heading as="h1" size="xl" className="text-white">
          {config.siteTitle}
        </Heading>
      </Link>
    </UiHeader>
  );
};

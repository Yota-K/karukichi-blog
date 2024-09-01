import { Text, Footer as UiFooter } from '../../components';
import { config } from '../../config';

export const AppFooter = () => {
  return (
    <UiFooter>
      <Text>
        © 2020 〜{new Date().getFullYear()} {config.siteTitle}
      </Text>
    </UiFooter>
  );
};

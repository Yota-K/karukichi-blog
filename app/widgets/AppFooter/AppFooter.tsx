import { Text, Footer as UiFooter } from '../../components';
import { Config } from '../../config';

export const AppFooter = () => {
  return (
    <UiFooter>
      <Text>
        © 2020 〜{new Date().getFullYear()} {Config.siteTitle}
      </Text>
    </UiFooter>
  );
};

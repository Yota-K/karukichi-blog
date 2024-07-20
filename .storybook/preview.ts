// storybook上で、remixのルーティングに関するコンポーネントを表示するために必要なアドオン
// https://storybook.js.org/addons/storybook-addon-remix-react-router
import { withRouter } from 'storybook-addon-remix-react-router';

import type { Preview } from '@storybook/react';
import '../app/tailwind.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withRouter()],
};

export default preview;

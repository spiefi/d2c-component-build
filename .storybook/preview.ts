import type { Preview } from '@storybook/react-vite';

import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    a11y: {
      test: 'todo',
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
};

export default preview;


import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/ports/react/knowledge/atoms/**/*.stories.@(ts|tsx)',
    '../src/ports/react/knowledge/composites/**/*.stories.@(ts|tsx)',
    '../src/ports/react/knowledge/templates/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  manager: {
    // Manager.ts already calls addons.setConfig with theme — referenced for build
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;

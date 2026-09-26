import type { Preview } from '@storybook/react';
import './preview.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'ember-circuit',
      values: [
        { name: 'ember-circuit', value: '#161411' },
        { name: 'raised', value: '#211d18' },
        { name: 'recessed', value: '#0e1114' },
        { name: 'light', value: '#f1e7d2' },
      ],
    },
    layout: 'padded',
  },
};

export default preview;

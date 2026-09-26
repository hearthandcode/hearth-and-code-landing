import type { Preview } from '@storybook/react';
import * as React from 'react';
// Vite will inline these CSS strings at build time via ?inline
import previewCss from './preview.css?inline';
import componentCss from './component-styles.css?inline';

/**
 * Ember Circuit Storybook Preview
 *
 * Storybook 7's static build doesn't auto-link CSS imported via the preview
 * file into iframe.html. The cleanest solution is to inject the styles
 * inline via a React style tag in the decorator.
 *
 * This works because:
 *  1. The decorator wraps every story in <div className="ec-preview">
 *  2. The <style> tags add Ember Circuit CSS to the document head
 *  3. Components use class names from .kc-* selectors that now apply
 */
const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <style dangerouslySetInnerHTML={{ __html: previewCss }} />
        <style dangerouslySetInnerHTML={{ __html: componentCss }} />
        <div className="ec-preview">
          <Story />
        </div>
      </>
    ),
  ],
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
    controls: { expanded: true },
    docs: {
      source: { type: 'code' },
    },
  },
};

export default preview;

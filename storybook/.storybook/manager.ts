import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

/**
 * Ember Circuit Storybook Manager Theme
 *
 * The manager is the surrounding UI (sidebar, top toolbar, canvas,
 * addon panels). This themes the entire Storybook chrome with our colors.
 *
 * Storybook's official 'dark' theme is used as the base, with our
 * Ember Circuit colors overlaid on the theme tokens.
 */

// Register the addon so the theme applies
addons.setConfig({
  theme: {
    ...themes.dark,
    appBg: '#161411',
    appContentBg: '#161411',
    appBorderColor: '#4b4237',
    appBorderRadius: 4,
    barBg: '#0e1114',
    barTextColor: '#cfc1ab',
    barSelectedColor: '#e85b4e',
    base: 'dark',

    // Brand colors
    brandTitle: 'Hearth & Code',
    brandUrl: '/design-system/',
    brandImage: undefined,
    brandTarget: '_self',

    // Colors
    colorPrimary: '#e85b4e',
    colorSecondary: '#9b5de5',

    // Form controls / inputs
    inputBg: '#0e1114',
    inputBorder: '#4b4237',
    inputTextColor: '#f1e7d2',
    inputBorderRadius: 4,

    // Typography
    fontBase: '"Inter", system-ui, sans-serif',
    fontCode: '"JetBrains Mono", ui-monospace, monospace',

    // Toolbar
    toolbarBg: '#0e1114',
    toolbarTextColor: '#cfc1ab',
    toolbarSelectedBg: '#211d18',
    toolbarSelectedColor: '#e85b4e',
    toolbarHoverBg: '#211d18',

    // Sidebar
    sidebarBg: '#0e1114',
    sidebarTextColor: '#cfc1ab',
    sidebarActiveTextColor: '#e85b4e',
    sidebarActiveBg: '#211d18',
    sidebarHoverTextColor: '#f1e7d2',

    // Content (canvas background)
    contentBg: '#161411',
    contentTextColor: '#f1e7d2',

    // Notification
    notificationBg: '#e85b4e',
    notificationTextColor: '#161411',

    // Shadow / elevation
    shadow: '0 2px 8px rgba(0,0,0,0.3)',
  },
});

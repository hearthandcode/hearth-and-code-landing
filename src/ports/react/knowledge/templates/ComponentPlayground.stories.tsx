import type { Meta, StoryObj } from '@storybook/react';
import { ComponentPlayground } from './ComponentPlayground';

const meta: Meta<typeof ComponentPlayground> = {
  title: 'Knowledge/Templates/ComponentPlayground',
  component: ComponentPlayground,
  tags: ['autodocs'],
  argTypes: {
    componentName: { control: 'text' },
    initialProps: { control: 'text' },
    propMeta: { control: 'text' },
    previewHtml: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentPlayground>;

export const Default: Story = { args: {} };

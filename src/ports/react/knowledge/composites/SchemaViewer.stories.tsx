import type { Meta, StoryObj } from '@storybook/react';
import { SchemaViewer } from './SchemaViewer';

const meta: Meta<typeof SchemaViewer> = {
  title: 'Knowledge/Composites/SchemaViewer',
  component: SchemaViewer,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    fields: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SchemaViewer>;

export const Default: Story = { args: {} };

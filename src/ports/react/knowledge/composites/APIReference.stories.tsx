import type { Meta, StoryObj } from '@storybook/react';
import { APIReference } from './APIReference';

const meta: Meta<typeof APIReference> = {
  title: 'Knowledge/Composites/APIReference',
  component: APIReference,
  tags: ['autodocs'],
  argTypes: {
    endpoint: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof APIReference>;

export const Default: Story = { args: {} };

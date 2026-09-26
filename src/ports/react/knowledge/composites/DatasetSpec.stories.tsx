import type { Meta, StoryObj } from '@storybook/react';
import { DatasetSpec } from './DatasetSpec';

const meta: Meta<typeof DatasetSpec> = {
  title: 'Knowledge/Composites/DatasetSpec',
  component: DatasetSpec,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    version: { control: 'text' },
    size: { control: 'text' },
    format: { control: 'text' },
    license: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DatasetSpec>;

export const Default: Story = { args: {} };

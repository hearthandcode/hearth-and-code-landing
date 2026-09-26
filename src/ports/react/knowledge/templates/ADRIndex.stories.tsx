import type { Meta, StoryObj } from '@storybook/react';
import { ADRIndex } from './ADRIndex';

const meta: Meta<typeof ADRIndex> = {
  title: 'Knowledge/Templates/ADRIndex',
  component: ADRIndex,
  tags: ['autodocs'],
  argTypes: {
    adrs: { control: 'text' },
    filterable: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ADRIndex>;

export const Default: Story = { args: {} };

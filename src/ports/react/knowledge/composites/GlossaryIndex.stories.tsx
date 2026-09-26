import type { Meta, StoryObj } from '@storybook/react';
import { GlossaryIndex } from './GlossaryIndex';

const meta: Meta<typeof GlossaryIndex> = {
  title: 'Knowledge/Composites/GlossaryIndex',
  component: GlossaryIndex,
  tags: ['autodocs'],
  argTypes: {
    entries: { control: 'text' },
    filterable: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof GlossaryIndex>;

export const Default: Story = { args: {} };

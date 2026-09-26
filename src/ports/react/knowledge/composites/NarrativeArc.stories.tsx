import type { Meta, StoryObj } from '@storybook/react';
import { NarrativeArc } from './NarrativeArc';

const meta: Meta<typeof NarrativeArc> = {
  title: 'Knowledge/Composites/NarrativeArc',
  component: NarrativeArc,
  tags: ['autodocs'],
  argTypes: {
    beats: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof NarrativeArc>;

export const Default: Story = { args: {} };

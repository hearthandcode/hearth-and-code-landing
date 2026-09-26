import type { Meta, StoryObj } from '@storybook/react';
import { SynthesisSummary } from './SynthesisSummary';

const meta: Meta<typeof SynthesisSummary> = {
  title: 'Knowledge/Composites/SynthesisSummary',
  component: SynthesisSummary,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    claims: { control: 'text' },
    consensus: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SynthesisSummary>;

export const Default: Story = { args: {} };

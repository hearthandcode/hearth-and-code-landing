import type { Meta, StoryObj } from '@storybook/react';
import { ProvenanceMarker } from './ProvenanceMarker';

const meta: Meta<typeof ProvenanceMarker> = {
  title: 'Knowledge/Atoms/ProvenanceMarker',
  component: ProvenanceMarker,
  tags: ['autodocs'],
  argTypes: {
    kind: { control: 'select', options: ['primary', 'derived', 'cited', 'verified', 'inferred', 'speculative'] },
  },
};

export default meta;
type Story = StoryObj<typeof ProvenanceMarker>;

export const Primary: Story = { args: { kind: 'primary', source: 'Original' } };
export const Verified: Story = { args: { kind: 'verified', source: 'Independent reviewer' } };
export const Cited: Story = { args: { kind: 'cited' } };
export const Speculative: Story = { args: { kind: 'speculative', source: 'Hypothesis' } };

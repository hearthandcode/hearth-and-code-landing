import type { Meta, StoryObj } from '@storybook/react';
import { EvidenceStrength } from './EvidenceStrength';

const meta: Meta<typeof EvidenceStrength> = {
  title: 'Knowledge/Atoms/EvidenceStrength',
  component: EvidenceStrength,
  tags: ['autodocs'],
  argTypes: {
    tier: { control: 'select', options: ['anecdotal', 'weak', 'moderate', 'strong', 'conclusive'] },
  },
};

export default meta;
type Story = StoryObj<typeof EvidenceStrength>;

export const Anecdotal: Story = { args: { tier: 'anecdotal' } };
export const Weak: Story = { args: { tier: 'weak' } };
export const Moderate: Story = { args: { tier: 'moderate' } };
export const Strong: Story = { args: { tier: 'strong' } };
export const Conclusive: Story = { args: { tier: 'conclusive' } };

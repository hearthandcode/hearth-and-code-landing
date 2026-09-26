import type { Meta, StoryObj } from '@storybook/react';
import { EvidencePackage } from './EvidencePackage';

const meta: Meta<typeof EvidencePackage> = {
  title: 'Knowledge/Templates/EvidencePackage',
  component: EvidencePackage,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    claim: { control: 'text' },
    receipts: { control: 'text' },
    sealedBy: { control: 'text' },
    sealedAt: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof EvidencePackage>;

export const Default: Story = { args: {} };

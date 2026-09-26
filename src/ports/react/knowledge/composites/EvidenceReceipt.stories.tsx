import type { Meta, StoryObj } from '@storybook/react';
import { EvidenceReceipt } from './EvidenceReceipt';

const meta: Meta<typeof EvidenceReceipt> = {
  title: 'Knowledge/Composites/EvidenceReceipt',
  component: EvidenceReceipt,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    type: { control: 'text' },
    description: { control: 'text' },
    hash: { control: 'text' },
    hashAlgorithm: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof EvidenceReceipt>;

export const Default: Story = { args: {} };

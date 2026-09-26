import type { Meta, StoryObj } from '@storybook/react';
import { ClaimMarker } from './ClaimMarker';

const meta: Meta<typeof ClaimMarker> = {
  title: 'Knowledge/Atoms/ClaimMarker',
  component: ClaimMarker,
  tags: ['autodocs'],
  argTypes: {
    index: { control: 'number' },
    confidence: { control: { type: 'range', min: 0, max: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof ClaimMarker>;

export const Default: Story = { args: { index: 1 } };
export const HighConfidence: Story = { args: { index: 2, confidence: 92 } };
export const MediumConfidence: Story = { args: { index: 3, confidence: 65 } };
export const LowConfidence: Story = { args: { index: 4, confidence: 30 } };

import type { Meta, StoryObj } from '@storybook/react';
import { ConfidenceBar } from './ConfidenceBar';

const meta: Meta<typeof ConfidenceBar> = {
  title: 'Knowledge/Atoms/ConfidenceBar',
  component: ConfidenceBar,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['low', 'medium', 'high', 'stated'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
    showValue: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ConfidenceBar>;

export const Low: Story = { args: { value: 20, variant: 'low', showValue: true } };
export const Medium: Story = { args: { value: 55, variant: 'medium', showValue: true } };
export const High: Story = { args: { value: 85, variant: 'high', showValue: true } };
export const Stated: Story = { args: { value: 75, variant: 'stated', showValue: true } };

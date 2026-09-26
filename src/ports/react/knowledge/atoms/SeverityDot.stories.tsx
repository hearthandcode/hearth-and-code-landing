import type { Meta, StoryObj } from '@storybook/react';
import { SeverityDot } from './SeverityDot';

const meta: Meta<typeof SeverityDot> = {
  title: 'Knowledge/Atoms/SeverityDot',
  component: SeverityDot,
  tags: ['autodocs'],
  argTypes: {
    severity: { control: 'select', options: ['info', 'success', 'caution', 'warning', 'error', 'critical'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    pulsing: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof SeverityDot>;

export const Info: Story = { args: { severity: 'info', label: 'Info' } };
export const Success: Story = { args: { severity: 'success', label: 'OK' } };
export const Caution: Story = { args: { severity: 'caution', label: 'Caution' } };
export const Critical: Story = { args: { severity: 'critical', label: 'Critical', pulsing: true } };

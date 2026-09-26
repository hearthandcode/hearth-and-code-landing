import type { Meta, StoryObj } from '@storybook/react';
import { TimestampAtom } from './TimestampAtom';

const meta: Meta<typeof TimestampAtom> = {
  title: 'Knowledge/Atoms/TimestampAtom',
  component: TimestampAtom,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['absolute', 'relative', 'both'] },
  },
};

export default meta;
type Story = StoryObj<typeof TimestampAtom>;

export const Both: Story = { args: { iso: '2026-09-26T10:30:00Z', relative: '2 hours ago' } };
export const Absolute: Story = { args: { iso: '2026-09-26T10:30:00Z', variant: 'absolute' } };
export const Relative: Story = { args: { iso: '2026-09-26T10:30:00Z', relative: '5m ago', variant: 'relative' } };

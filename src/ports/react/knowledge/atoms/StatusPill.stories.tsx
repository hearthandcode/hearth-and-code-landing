import type { Meta, StoryObj } from '@storybook/react';
import { StatusPill } from './StatusPill';

const meta: Meta<typeof StatusPill> = {
  title: 'Knowledge/Atoms/StatusPill',
  component: StatusPill,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['open', 'closed', 'pending', 'sealed', 'active', 'archived', 'review', 'rejected', 'approved', 'draft'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
};

export default meta;
type Story = StoryObj<typeof StatusPill>;

export const Sealed: Story = { args: { status: 'sealed' } };
export const Approved: Story = { args: { status: 'approved', label: 'Gate Passed' } };
export const Pending: Story = { args: { status: 'pending' } };
export const Rejected: Story = { args: { status: 'rejected' } };

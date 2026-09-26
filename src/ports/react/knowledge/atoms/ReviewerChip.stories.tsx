import type { Meta, StoryObj } from '@storybook/react';
import { ReviewerChip } from './ReviewerChip';

const meta: Meta<typeof ReviewerChip> = {
  title: 'Knowledge/Atoms/ReviewerChip',
  component: ReviewerChip,
  tags: ['autodocs'],
  argTypes: {
    decision: { control: 'select', options: ['approved', 'rejected', 'pending', 'abstained'] },
  },
};

export default meta;
type Story = StoryObj<typeof ReviewerChip>;

export const Approved: Story = { args: { name: 'Scott Rallya', role: 'Architect', decision: 'approved' } };
export const Pending: Story = { args: { name: 'Reviewer', role: 'Security', decision: 'pending' } };
export const Rejected: Story = { args: { name: 'Reviewer', role: 'Privacy', decision: 'rejected' } };

import type { Meta, StoryObj } from '@storybook/react';
import { AuditTrail } from './AuditTrail';

const meta: Meta<typeof AuditTrail> = {
  title: 'Knowledge/Composites/AuditTrail',
  component: AuditTrail,
  tags: ['autodocs'],
  argTypes: {
    events: { control: 'text' },
    filterable: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AuditTrail>;

export const Default: Story = { args: {} };

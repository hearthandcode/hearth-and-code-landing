import type { Meta, StoryObj } from '@storybook/react';
import { AuditReport } from './AuditReport';

const meta: Meta<typeof AuditReport> = {
  title: 'Knowledge/Templates/AuditReport',
  component: AuditReport,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    scope: { control: 'text' },
    auditor: { control: 'text' },
    auditedEntity: { control: 'text' },
    period: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AuditReport>;

export const Default: Story = { args: {} };

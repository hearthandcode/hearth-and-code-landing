import type { Meta, StoryObj } from '@storybook/react';
import { ComplianceStatus } from './ComplianceStatus';

const meta: Meta<typeof ComplianceStatus> = {
  title: 'Knowledge/Composites/ComplianceStatus',
  component: ComplianceStatus,
  tags: ['autodocs'],
  argTypes: {
    framework: { control: 'text' },
    controls: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ComplianceStatus>;

export const Default: Story = { args: {} };

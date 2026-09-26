import type { Meta, StoryObj } from '@storybook/react';
import { ComplianceDashboard } from './ComplianceDashboard';

const meta: Meta<typeof ComplianceDashboard> = {
  title: 'Knowledge/Templates/ComplianceDashboard',
  component: ComplianceDashboard,
  tags: ['autodocs'],
  argTypes: {
    frameworks: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ComplianceDashboard>;

export const Default: Story = { args: {} };

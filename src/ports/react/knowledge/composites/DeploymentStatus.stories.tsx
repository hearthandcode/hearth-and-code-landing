import type { Meta, StoryObj } from '@storybook/react';
import { DeploymentStatus } from './DeploymentStatus';

const meta: Meta<typeof DeploymentStatus> = {
  title: 'Knowledge/Composites/DeploymentStatus',
  component: DeploymentStatus,
  tags: ['autodocs'],
  argTypes: {
    environments: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DeploymentStatus>;

export const Default: Story = { args: {} };

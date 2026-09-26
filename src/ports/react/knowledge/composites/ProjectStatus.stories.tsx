import type { Meta, StoryObj } from '@storybook/react';
import { ProjectStatus } from './ProjectStatus';

const meta: Meta<typeof ProjectStatus> = {
  title: 'Knowledge/Composites/ProjectStatus',
  component: ProjectStatus,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    owner: { control: 'text' },
    status: { control: 'text' },
    progress: { control: 'text' },
    lastActivity: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ProjectStatus>;

export const Default: Story = { args: {} };

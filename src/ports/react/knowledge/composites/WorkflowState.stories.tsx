import type { Meta, StoryObj } from '@storybook/react';
import { WorkflowState } from './WorkflowState';

const meta: Meta<typeof WorkflowState> = {
  title: 'Knowledge/Composites/WorkflowState',
  component: WorkflowState,
  tags: ['autodocs'],
  argTypes: {
    states: { control: 'text' },
    transitions: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof WorkflowState>;

export const Default: Story = { args: {} };

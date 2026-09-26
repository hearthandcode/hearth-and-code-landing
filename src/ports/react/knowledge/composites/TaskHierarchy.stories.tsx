import type { Meta, StoryObj } from '@storybook/react';
import { TaskHierarchy } from './TaskHierarchy';

const meta: Meta<typeof TaskHierarchy> = {
  title: 'Knowledge/Composites/TaskHierarchy',
  component: TaskHierarchy,
  tags: ['autodocs'],
  argTypes: {
    tasks: { control: 'text' },
    initiallyExpanded: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof TaskHierarchy>;

export const Default: Story = { args: {} };

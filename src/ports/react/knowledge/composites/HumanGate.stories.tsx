import type { Meta, StoryObj } from '@storybook/react';
import { HumanGate } from './HumanGate';

const meta: Meta<typeof HumanGate> = {
  title: 'Knowledge/Composites/HumanGate',
  component: HumanGate,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    description: { control: 'text' },
    reviewer: { control: 'text' },
    reviewerRole: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof HumanGate>;

export const Default: Story = { args: {} };

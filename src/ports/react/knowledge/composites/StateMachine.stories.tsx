import type { Meta, StoryObj } from '@storybook/react';
import { StateMachine } from './StateMachine';

const meta: Meta<typeof StateMachine> = {
  title: 'Knowledge/Composites/StateMachine',
  component: StateMachine,
  tags: ['autodocs'],
  argTypes: {
    states: { control: 'text' },
    transitions: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof StateMachine>;

export const Default: Story = { args: {} };

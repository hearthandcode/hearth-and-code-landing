import type { Meta, StoryObj } from '@storybook/react';
import { DecisionWorkspace } from './DecisionWorkspace';

const meta: Meta<typeof DecisionWorkspace> = {
  title: 'Knowledge/Templates/DecisionWorkspace',
  component: DecisionWorkspace,
  tags: ['autodocs'],
  argTypes: {
    initialADR: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DecisionWorkspace>;

export const Default: Story = { args: {} };

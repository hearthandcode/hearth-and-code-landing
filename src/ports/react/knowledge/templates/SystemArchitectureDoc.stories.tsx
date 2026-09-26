import type { Meta, StoryObj } from '@storybook/react';
import { SystemArchitectureDoc } from './SystemArchitectureDoc';

const meta: Meta<typeof SystemArchitectureDoc> = {
  title: 'Knowledge/Templates/SystemArchitectureDoc',
  component: SystemArchitectureDoc,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    version: { control: 'text' },
    sections: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SystemArchitectureDoc>;

export const Default: Story = { args: {} };

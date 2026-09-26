import type { Meta, StoryObj } from '@storybook/react';
import { OperationsRunbook } from './OperationsRunbook';

const meta: Meta<typeof OperationsRunbook> = {
  title: 'Knowledge/Templates/OperationsRunbook',
  component: OperationsRunbook,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    procedure: { control: 'text' },
    recentLogs: { control: 'text' },
    oncall: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof OperationsRunbook>;

export const Default: Story = { args: {} };

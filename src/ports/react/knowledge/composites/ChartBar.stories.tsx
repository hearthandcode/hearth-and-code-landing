import type { Meta, StoryObj } from '@storybook/react';
import { ChartBar } from './ChartBar';

const meta: Meta<typeof ChartBar> = {
  title: 'Knowledge/Composites/ChartBar',
  component: ChartBar,
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'text' },
    height: { control: 'text' },
    showAxis: { control: 'text' },
    showValues: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ChartBar>;

export const Default: Story = { args: {} };

import type { Meta, StoryObj } from '@storybook/react';
import { RunLog } from './RunLog';

const meta: Meta<typeof RunLog> = {
  title: 'Knowledge/Composites/RunLog',
  component: RunLog,
  tags: ['autodocs'],
  argTypes: {
    entries: { control: 'text' },
    filterable: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof RunLog>;

export const Default: Story = { args: {} };

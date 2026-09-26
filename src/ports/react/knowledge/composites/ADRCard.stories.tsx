import type { Meta, StoryObj } from '@storybook/react';
import { ADRCard } from './ADRCard';

const meta: Meta<typeof ADRCard> = {
  title: 'Knowledge/Composites/ADRCard',
  component: ADRCard,
  tags: ['autodocs'],
  argTypes: {
    number: { control: 'text' },
    title: { control: 'text' },
    status: { control: 'text' },
    date: { control: 'text' },
    context: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ADRCard>;

export const Default: Story = { args: {} };

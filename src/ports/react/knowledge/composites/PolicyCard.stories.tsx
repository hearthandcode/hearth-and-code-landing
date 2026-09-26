import type { Meta, StoryObj } from '@storybook/react';
import { PolicyCard } from './PolicyCard';

const meta: Meta<typeof PolicyCard> = {
  title: 'Knowledge/Composites/PolicyCard',
  component: PolicyCard,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    title: { control: 'text' },
    statement: { control: 'text' },
    effectiveDate: { control: 'text' },
    scope: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PolicyCard>;

export const Default: Story = { args: {} };

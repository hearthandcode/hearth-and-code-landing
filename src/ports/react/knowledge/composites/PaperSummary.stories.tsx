import type { Meta, StoryObj } from '@storybook/react';
import { PaperSummary } from './PaperSummary';

const meta: Meta<typeof PaperSummary> = {
  title: 'Knowledge/Composites/PaperSummary',
  component: PaperSummary,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    authors: { control: 'text' },
    year: { control: 'text' },
    venue: { control: 'text' },
    abstract: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PaperSummary>;

export const Default: Story = { args: {} };

import type { Meta, StoryObj } from '@storybook/react';
import { ExperimentCard } from './ExperimentCard';

const meta: Meta<typeof ExperimentCard> = {
  title: 'Knowledge/Composites/ExperimentCard',
  component: ExperimentCard,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    title: { control: 'text' },
    hypothesis: { control: 'text' },
    method: { control: 'text' },
    results: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ExperimentCard>;

export const Default: Story = { args: {} };

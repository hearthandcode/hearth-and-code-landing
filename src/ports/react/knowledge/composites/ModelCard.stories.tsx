import type { Meta, StoryObj } from '@storybook/react';
import { ModelCard } from './ModelCard';

const meta: Meta<typeof ModelCard> = {
  title: 'Knowledge/Composites/ModelCard',
  component: ModelCard,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    version: { control: 'text' },
    purpose: { control: 'text' },
    trainingData: { control: 'text' },
    evalResults: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ModelCard>;

export const Default: Story = { args: {} };

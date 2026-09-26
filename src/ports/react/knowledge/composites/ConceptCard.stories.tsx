import type { Meta, StoryObj } from '@storybook/react';
import { ConceptCard } from './ConceptCard';

const meta: Meta<typeof ConceptCard> = {
  title: 'Knowledge/Composites/ConceptCard',
  component: ConceptCard,
  tags: ['autodocs'],
  argTypes: {
    term: { control: 'text' },
    definition: { control: 'text' },
    type: { control: 'text' },
    relations: { control: 'text' },
    source: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ConceptCard>;

export const Default: Story = { args: {} };

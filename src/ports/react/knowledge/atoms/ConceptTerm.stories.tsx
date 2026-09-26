import type { Meta, StoryObj } from '@storybook/react';
import { ConceptTerm } from './ConceptTerm';

const meta: Meta<typeof ConceptTerm> = {
  title: 'Knowledge/Atoms/ConceptTerm',
  component: ConceptTerm,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['noun', 'verb', 'adjective', 'phrase', 'abbreviation'] },
  },
};

export default meta;
type Story = StoryObj<typeof ConceptTerm>;

export const Noun: Story = { args: { term: 'Provenance', type: 'noun' } };
export const Abbreviation: Story = { args: { term: 'ADT', type: 'abbreviation', definition: 'Algebraic Data Type' } };
export const Verb: Story = { args: { term: 'extends', type: 'verb' } };
export const Phrase: Story = { args: { term: 'open-source intelligence', type: 'phrase' } };

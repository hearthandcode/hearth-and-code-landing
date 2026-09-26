import type { Meta, StoryObj } from '@storybook/react';
import { OntologyRelation } from './OntologyRelation';

const meta: Meta<typeof OntologyRelation> = {
  title: 'Knowledge/Composites/OntologyRelation',
  component: OntologyRelation,
  tags: ['autodocs'],
  argTypes: {
    subject: { control: 'text' },
    subjectType: { control: 'text' },
    verb: { control: 'text' },
    object: { control: 'text' },
    objectType: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof OntologyRelation>;

export const Default: Story = { args: {} };

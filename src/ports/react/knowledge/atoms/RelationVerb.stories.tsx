import type { Meta, StoryObj } from '@storybook/react';
import { RelationVerb } from './RelationVerb';

const meta: Meta<typeof RelationVerb> = {
  title: 'Knowledge/Atoms/RelationVerb',
  component: RelationVerb,
  tags: ['autodocs'],
  argTypes: {
    verb: { control: 'select', options: ['is-a', 'part-of', 'causes', 'requires', 'enables', 'precedes', 'follows', 'contradicts', 'supports', 'extends', 'instance-of', 'same-as'] },
    direction: { control: 'select', options: ['forward', 'backward', 'bidirectional'] },
  },
};

export default meta;
type Story = StoryObj<typeof RelationVerb>;

export const IsA: Story = { args: { verb: 'is-a' } };
export const PartOf: Story = { args: { verb: 'part-of' } };
export const Causes: Story = { args: { verb: 'causes' } };
export const Bidirectional: Story = { args: { verb: 'extends', direction: 'bidirectional' } };

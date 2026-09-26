import type { Meta, StoryObj } from '@storybook/react';
import { SequenceDiagram } from './SequenceDiagram';

const meta: Meta<typeof SequenceDiagram> = {
  title: 'Knowledge/Composites/SequenceDiagram',
  component: SequenceDiagram,
  tags: ['autodocs'],
  argTypes: {
    actors: { control: 'text' },
    messages: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SequenceDiagram>;

export const Default: Story = { args: {} };

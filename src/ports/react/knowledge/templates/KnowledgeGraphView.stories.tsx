import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeGraphView } from './KnowledgeGraphView';

const meta: Meta<typeof KnowledgeGraphView> = {
  title: 'Knowledge/Templates/KnowledgeGraphView',
  component: KnowledgeGraphView,
  tags: ['autodocs'],
  argTypes: {
    nodes: { control: 'text' },
    edges: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof KnowledgeGraphView>;

export const Default: Story = { args: {} };

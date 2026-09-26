import type { Meta, StoryObj } from '@storybook/react';
import { ArchitectureDiagram } from './ArchitectureDiagram';

const meta: Meta<typeof ArchitectureDiagram> = {
  title: 'Knowledge/Composites/ArchitectureDiagram',
  component: ArchitectureDiagram,
  tags: ['autodocs'],
  argTypes: {
    nodes: { control: 'text' },
    edges: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ArchitectureDiagram>;

export const Default: Story = { args: {} };

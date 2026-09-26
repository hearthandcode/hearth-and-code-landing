import type { Meta, StoryObj } from '@storybook/react';
import { DialogueTree } from './DialogueTree';

const meta: Meta<typeof DialogueTree> = {
  title: 'Knowledge/Composites/DialogueTree',
  component: DialogueTree,
  tags: ['autodocs'],
  argTypes: {
    nodes: { control: 'text' },
    rootId: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DialogueTree>;

export const Default: Story = { args: {} };

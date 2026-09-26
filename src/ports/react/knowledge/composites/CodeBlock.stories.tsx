import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: 'Knowledge/Composites/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  argTypes: {
    code: { control: 'text' },
    language: { control: 'text' },
    filename: { control: 'text' },
    highlightLines: { control: 'text' },
    showLineNumbers: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = { args: {} };

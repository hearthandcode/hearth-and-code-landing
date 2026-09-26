import type { Meta, StoryObj } from '@storybook/react';
import { CitationChain } from './CitationChain';

const meta: Meta<typeof CitationChain> = {
  title: 'Knowledge/Composites/CitationChain',
  component: CitationChain,
  tags: ['autodocs'],
  argTypes: {
    citations: { control: 'text' },
    label: { control: 'text' },
    separator: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CitationChain>;

export const Default: Story = { args: {} };

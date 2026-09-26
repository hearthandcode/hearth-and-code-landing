import type { Meta, StoryObj } from '@storybook/react';
import { PromptPattern } from './PromptPattern';

const meta: Meta<typeof PromptPattern> = {
  title: 'Knowledge/Composites/PromptPattern',
  component: PromptPattern,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    category: { control: 'text' },
    template: { control: 'text' },
    variables: { control: 'text' },
    example: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PromptPattern>;

export const Default: Story = { args: {} };

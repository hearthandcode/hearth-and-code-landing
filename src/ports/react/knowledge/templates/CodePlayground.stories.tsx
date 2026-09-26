import type { Meta, StoryObj } from '@storybook/react';
import { CodePlayground } from './CodePlayground';

const meta: Meta<typeof CodePlayground> = {
  title: 'Knowledge/Templates/CodePlayground',
  component: CodePlayground,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    code: { control: 'text' },
    language: { control: 'text' },
    output: { control: 'text' },
    explanation: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CodePlayground>;

export const Default: Story = { args: {} };

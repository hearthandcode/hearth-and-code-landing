import type { Meta, StoryObj } from '@storybook/react';
import { LanguageTag } from './LanguageTag';

const meta: Meta<typeof LanguageTag> = {
  title: 'Knowledge/Atoms/LanguageTag',
  component: LanguageTag,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['plain', 'compact', 'minimal'] },
  },
};

export default meta;
type Story = StoryObj<typeof LanguageTag>;

export const TypeScript: Story = { args: { language: 'typescript' } };
export const Python: Story = { args: { language: 'python' } };
export const Rust: Story = { args: { language: 'rust' } };
export const YAML: Story = { args: { language: 'yaml', variant: 'compact' } };

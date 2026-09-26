import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeBaseBrowser } from './KnowledgeBaseBrowser';

const meta: Meta<typeof KnowledgeBaseBrowser> = {
  title: 'Knowledge/Templates/KnowledgeBaseBrowser',
  component: KnowledgeBaseBrowser,
  tags: ['autodocs'],
  argTypes: {
    taxonomy: { control: 'text' },
    sections: { control: 'text' },
    searchable: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof KnowledgeBaseBrowser>;

export const Default: Story = { args: {} };

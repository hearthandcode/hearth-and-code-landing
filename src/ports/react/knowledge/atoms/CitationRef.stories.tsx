import type { Meta, StoryObj } from '@storybook/react';
import { CitationRef } from './CitationRef';

const meta: Meta<typeof CitationRef> = {
  title: 'Knowledge/Atoms/CitationRef',
  component: CitationRef,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['inline', 'footnote', 'parenthetical'] },
    year: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof CitationRef>;

export const Inline: Story = { args: { author: 'Rallya', year: 2026, locator: 'p.42' } };
export const Footnote: Story = { args: { author: 'Frost', year: 2016, variant: 'footnote' } };
export const Parenthetical: Story = { args: { author: 'Popper', year: 1959, variant: 'parenthetical' } };
export const WithLink: Story = { args: { author: 'Rallya', year: 2026, href: '#' } };

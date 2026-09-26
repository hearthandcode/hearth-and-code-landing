import type { Meta, StoryObj } from '@storybook/react';
import { TaxonomyTree } from './TaxonomyTree';

const meta: Meta<typeof TaxonomyTree> = {
  title: 'Knowledge/Composites/TaxonomyTree',
  component: TaxonomyTree,
  tags: ['autodocs'],
  argTypes: {
    root: { control: 'text' },
    initiallyExpanded: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof TaxonomyTree>;

export const Default: Story = { args: {} };

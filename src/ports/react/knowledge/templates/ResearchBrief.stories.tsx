import type { Meta, StoryObj } from '@storybook/react';
import { ResearchBrief } from './ResearchBrief';

const meta: Meta<typeof ResearchBrief> = {
  title: 'Knowledge/Templates/ResearchBrief',
  component: ResearchBrief,
  tags: ['autodocs'],
  argTypes: {
    paper: { control: 'text' },
    related: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ResearchBrief>;

export const Default: Story = { args: {} };

import type { Meta, StoryObj } from '@storybook/react';
import { CreativeProjectBrief } from './CreativeProjectBrief';

const meta: Meta<typeof CreativeProjectBrief> = {
  title: 'Knowledge/Templates/CreativeProjectBrief',
  component: CreativeProjectBrief,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    premise: { control: 'text' },
    arc: { control: 'text' },
    sampleDialogue: { control: 'text' },
    characters: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CreativeProjectBrief>;

export const Default: Story = { args: {} };

import type { Meta, StoryObj } from '@storybook/react';
import { SourceChain } from './SourceChain';

const meta: Meta<typeof SourceChain> = {
  title: 'Knowledge/Composites/SourceChain',
  component: SourceChain,
  tags: ['autodocs'],
  argTypes: {
    root: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SourceChain>;

export const Default: Story = { args: {} };

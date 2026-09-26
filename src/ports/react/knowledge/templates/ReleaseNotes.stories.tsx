import type { Meta, StoryObj } from '@storybook/react';
import { ReleaseNotes } from './ReleaseNotes';

const meta: Meta<typeof ReleaseNotes> = {
  title: 'Knowledge/Templates/ReleaseNotes',
  component: ReleaseNotes,
  tags: ['autodocs'],
  argTypes: {
    product: { control: 'text' },
    releases: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ReleaseNotes>;

export const Default: Story = { args: {} };

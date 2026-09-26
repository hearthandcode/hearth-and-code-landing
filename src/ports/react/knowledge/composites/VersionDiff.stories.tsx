import type { Meta, StoryObj } from '@storybook/react';
import { VersionDiff } from './VersionDiff';

const meta: Meta<typeof VersionDiff> = {
  title: 'Knowledge/Composites/VersionDiff',
  component: VersionDiff,
  tags: ['autodocs'],
  argTypes: {
    before: { control: 'text' },
    after: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof VersionDiff>;

export const Default: Story = { args: {} };

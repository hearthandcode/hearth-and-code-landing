import type { Meta, StoryObj } from '@storybook/react';
import { PathBreadcrumb } from './PathBreadcrumb';

const meta: Meta<typeof PathBreadcrumb> = {
  title: 'Knowledge/Atoms/PathBreadcrumb',
  component: PathBreadcrumb,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'select', options: ['folder', 'file', 'package'] },
  },
};

export default meta;
type Story = StoryObj<typeof PathBreadcrumb>;

export const Folder: Story = { args: { segment: 'knowledge/atoms', icon: 'folder' } };
export const File: Story = { args: { segment: 'CitationRef.astro', icon: 'file' } };
export const Package: Story = { args: { segment: '@hearthandcode/core', icon: 'package' } };

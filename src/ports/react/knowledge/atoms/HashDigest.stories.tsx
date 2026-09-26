import type { Meta, StoryObj } from '@storybook/react';
import { HashDigest } from './HashDigest';

const meta: Meta<typeof HashDigest> = {
  title: 'Knowledge/Atoms/HashDigest',
  component: HashDigest,
  tags: ['autodocs'],
  argTypes: {
    algorithm: { control: 'select', options: ['sha256', 'sha1', 'md5', 'blake3'] },
  },
};

export default meta;
type Story = StoryObj<typeof HashDigest>;

export const SHA256: Story = { args: { hash: '7d4f8e2a1b9c5d6e3f8a2b1c9d4e5f8a2b1c9d4e5f8a2b1c9d4e5f8a2b1c9d4e', algorithm: 'sha256' } };
export const SHA1: Story = { args: { hash: '7d4f8e2a1b9c5d6e3f8a2b1c9d4e5f8a2b1c9d4e', algorithm: 'sha1' } };

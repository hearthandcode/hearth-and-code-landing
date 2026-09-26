import type { Meta, StoryObj } from '@storybook/react';
import { DOILink } from './DOILink';

const meta: Meta<typeof DOILink> = {
  title: 'Knowledge/Atoms/DOILink',
  component: DOILink,
  tags: ['autodocs'],
  argTypes: {
    short: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof DOILink>;

export const Default: Story = { args: { doi: '10.1234/example.2026.001' } };
export const Full: Story = { args: { doi: 'https://doi.org/10.1234/example.2026.001', short: false } };

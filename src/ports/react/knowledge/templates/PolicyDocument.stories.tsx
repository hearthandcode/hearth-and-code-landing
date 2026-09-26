import type { Meta, StoryObj } from '@storybook/react';
import { PolicyDocument } from './PolicyDocument';

const meta: Meta<typeof PolicyDocument> = {
  title: 'Knowledge/Templates/PolicyDocument',
  component: PolicyDocument,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    title: { control: 'text' },
    effectiveDate: { control: 'text' },
    reviewDate: { control: 'text' },
    owner: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PolicyDocument>;

export const Default: Story = { args: {} };

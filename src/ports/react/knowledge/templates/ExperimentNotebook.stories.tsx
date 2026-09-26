import type { Meta, StoryObj } from '@storybook/react';
import { ExperimentNotebook } from './ExperimentNotebook';

const meta: Meta<typeof ExperimentNotebook> = {
  title: 'Knowledge/Templates/ExperimentNotebook',
  component: ExperimentNotebook,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    experiments: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ExperimentNotebook>;

export const Default: Story = { args: {} };

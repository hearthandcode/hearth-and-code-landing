import type { Meta, StoryObj } from '@storybook/react';
import { LicenseIcon } from './LicenseIcon';

const meta: Meta<typeof LicenseIcon> = {
  title: 'Knowledge/Atoms/LicenseIcon',
  component: LicenseIcon,
  tags: ['autodocs'],
  argTypes: {
    license: { control: 'select', options: ['CC-BY', 'CC-BY-SA', 'CC-BY-NC', 'MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3', 'CC0', 'proprietary', 'unknown'] },
  },
};

export default meta;
type Story = StoryObj<typeof LicenseIcon>;

export const MIT: Story = { args: { license: 'MIT' } };
export const CCBY: Story = { args: { license: 'CC-BY' } };
export const CC0: Story = { args: { license: 'CC0' } };
export const Proprietary: Story = { args: { license: 'proprietary' } };

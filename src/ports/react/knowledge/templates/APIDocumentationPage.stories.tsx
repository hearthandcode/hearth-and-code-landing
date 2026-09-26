import type { Meta, StoryObj } from '@storybook/react';
import { APIDocumentationPage } from './APIDocumentationPage';

const meta: Meta<typeof APIDocumentationPage> = {
  title: 'Knowledge/Templates/APIDocumentationPage',
  component: APIDocumentationPage,
  tags: ['autodocs'],
  argTypes: {
    apiName: { control: 'text' },
    version: { control: 'text' },
    baseUrl: { control: 'text' },
    sections: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof APIDocumentationPage>;

export const Default: Story = { args: {} };

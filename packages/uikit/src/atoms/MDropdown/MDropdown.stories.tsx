import type { Meta, StoryObj } from '@storybook/react';

import MDropdown from './MDropdown';
import MText from '../MText/MText';
import MFlex from '../MFlex/MFlex';
import MButton from '../MButton/MButton';
import { useArgs } from '@storybook/preview-api';
import React from 'react';

const meta: Meta<typeof MDropdown> = {
  title: 'Atoms/Layout/MDropdown',
  component: MDropdown,
};

export default meta;
type Story = StoryObj<typeof MDropdown>;

export const Basic: Story = {
  args: {
    children: <MButton mode={'primary'}>Open dropdown</MButton>,
    dropdownContent: (
      <MFlex justify="space-between" direction="column" align="start">
        <MText>Dropdown content</MText>
        <MFlex gap="xl" justify="end">
          <MButton mode="primary">Primary</MButton>
          <MButton mode="secondary">Secondary</MButton>
        </MFlex>
      </MFlex>
    ),
  },

  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom'],
    },
    open: { type: 'boolean' },
    children: {
      control: { type: 'text' },
    },
    dropdownContent: {
      control: { type: 'text' },
    },
  },

  render: function Render(args) {
    const [{ open }, updateArgs] = useArgs();

    function onClick() {
      updateArgs({ open: !open });
    }

    return (
      <MDropdown {...args} onClose={() => updateArgs({ open: false })}>
        <MButton onClick={onClick}>Open dropdown</MButton>
      </MDropdown>
    );
  },
};

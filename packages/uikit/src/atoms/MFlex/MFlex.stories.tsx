import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import MFlex from './MFlex';
import { MIconDiceOne } from '../MIcon/icons/MIconDiceOne';
import { MIconDiceTwo } from '../MIcon/icons/MIconDiceTwo';
import { MIconDiceThree } from '../MIcon/icons/MIconDiceThree';

const meta: Meta<typeof MFlex> = {
  title: 'Atoms/Layout/MFlex',
  component: MFlex,
};

export default meta;
type Story = StoryObj<typeof MFlex>;

export const Basic: Story = {
  args: {
    gap: 's',
    direction: 'row',
    align: 'center',
    justify: 'start',
    wrap: 'wrap',
    children: (
      <>
        <MIconDiceOne mode="regular" width={24} />
        <MIconDiceTwo mode="regular" width={24} />
        <MIconDiceThree mode="regular" width={24} />
      </>
    ),
  },

  argTypes: {
    gap: {
      control: { type: 'select' },
      options: ['xs', 's', 'm', 'l', 'xl', '3xl', '4xl'],
    },
    direction: {
      control: { type: 'select' },
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch'],
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'space-between', 'space-around'],
    },
    wrap: {
      control: { type: 'select' },
      options: ['wrap', 'nowrap'],
    },
  },
};

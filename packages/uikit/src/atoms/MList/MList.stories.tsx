import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import MList from './MList';
import MFlex from '../MFlex/MFlex';
import { MIconFinnTheHuman } from '../MIcon/icons/MIconFinnTheHuman';
import { MIconArrowFatLinesRight } from '../MIcon/icons/MIconArrowFatLinesRight';
import { MIconBracketsSquare } from '../MIcon/icons/MIconBracketsSquare';
import MText from '../MText/MText';

const meta: Meta<typeof MList> = {
  title: 'Atoms/Form/MList',
  component: MList,
};

const item = () => (
  <MFlex gap="s">
    <MIconBracketsSquare mode="regular" width={20} />
    <MText size={'m'}>List Item</MText>
  </MFlex>
);
const item1 = () => (
  <MFlex gap="s">
    <MIconArrowFatLinesRight mode="regular" width={20} />
    <MText size={'m'}>List Item</MText>
  </MFlex>
);
const item2 = () => (
  <MFlex gap="s">
    <MIconFinnTheHuman mode="regular" width={20} />
    <MText size={'m'}>List Item</MText>
  </MFlex>
);

export default meta;
type Story = StoryObj<typeof MList>;

export const Basic: Story = {
  args: {
    showDivider: true,
    options: [
      {
        key: 'item1',
        value: item(),
        role: 'listitem',
      },
      {
        key: 'item2',
        value: item1(),
      },
      {
        key: 'item3',
        value: item2(),
      },
      {
        key: 'item4',
        value: item(),
      },
      {
        key: 'item5',
        value: item(),
      },
    ],
  },

  argTypes: {
    options: {
      control: {
        type: 'object',
      },
    },
    showDivider: {
      control: {
        type: 'boolean',
      },
    },
  },
};

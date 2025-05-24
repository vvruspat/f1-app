import React, { type ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './MText.module.css';
import type { TComponentSize } from '../../types/TComponentSize';

export type TextProps = ComponentProps<'span'> &
  Partial<TComponentSize> & {
    as?: 'span' | 'p' | 'div';
  };

export const MText = ({
  children,
  className,
  size = 'inherit',
  as = 'span',
  ...restProps
}: TextProps) => {
  return React.createElement(
    as,
    {
      className: clsx(styles[`size-${size}`], className),
      ...restProps,
    },
    children
  );
};

export default MText;

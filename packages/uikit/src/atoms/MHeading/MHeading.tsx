import React, { type ComponentProps, useMemo } from 'react';
import clsx from 'clsx';
import styles from './MHeading.module.css';

type HeadingProps = ComponentProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> & {
  mode: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export const MHeading = ({
  children,
  mode = 'h1',
  className,
  ...restProps
}: HeadingProps) => {
  const Component = mode ? (
        React.createElement(
          mode,
          { className: clsx(styles.heading, className), ...restProps },
          children
        )
      ) : (
        <></>
      );

  return Component;
};

export default MHeading;

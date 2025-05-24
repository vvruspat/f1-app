import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import MFlex from '../MFlex/MFlex';
import './MInput.vars.css';

import styles from './MInput.module.css';
import type { TComponentSize } from '../../types/TComponentSize';
import type { BasicInputProps } from '../../types/BasicInputProps';

export type InputProps = BasicInputProps & {
  after?: ReactNode;
  before?: ReactNode;
  wrapperClassName?: string;
  containerClassName?: string;
  headingClassName?: string;
  footerClassName?: string;
  inputWidth?: Extract<TComponentSize['size'], 's' | 'm' | 'l'> | 'auto';
};

export const MInput = ({
  status = 'regular',
  children,
  className,
  wrapperClassName,
  containerClassName,
  after,
  before,
  id,
  inputWidth = 'auto',
  headingClassName,
  footerClassName,
  ...restProps
}: InputProps) => {
  return (
    <MFlex
      direction="column"
      align="start"
      className={clsx(styles.inputWrapper, styles[status], wrapperClassName)}
    >
      <MFlex
        className={clsx(
          styles.inputContainer,
          styles[`size-${inputWidth}`],
          containerClassName
        )}
        justify={inputWidth === 'auto' ? 'stretch' : 'start'}
        direction="row"
        wrap="nowrap"
      >
        {before && <MFlex align="center">{before}</MFlex>}
        <MFlex justify="stretch" direction="row" className={styles.inputField}>
          <input className={clsx(styles.input, className)} {...restProps} />
        </MFlex>
        {after && <MFlex align="center">{after}</MFlex>}
      </MFlex>
    </MFlex>
  );
};

export default MInput;

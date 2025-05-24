import React, { type ReactNode, useId, useMemo } from 'react';
import clsx from 'clsx';
import MFieldDescription from '../MFieldDescription/MFieldDescription';
import MFlex from '../MFlex/MFlex';

import './MRadio.vars.css';
import styles from './MRadio.module.css';
import MLabel from '../MLabel/MLabel';
import type { BasicInputProps } from '../../types/BasicInputProps';

type RadioProps = BasicInputProps & {
  wrapperClassName?: string;
  containerClassName?: string;
  label?: ReactNode;
  description?: ReactNode;
  footerClassName?: string;
};

export const MRadio = ({
  status = 'regular',
  children,
  className,
  wrapperClassName,
  containerClassName,
  id,
  label,
  description,
  footerClassName,
  ...restProps
}: RadioProps) => {
  const uuid = useId();
  const fieldId = useMemo(() => id ?? uuid, [uuid, id]);

  return (
    <MFlex direction="column" align="start">
      <MLabel
        className={clsx(
          styles.inputContainer,
          styles[status],
          containerClassName
        )}
      >
        <MFlex align="start">
          <input
            type="radio"
            id={fieldId}
            className={clsx(styles[status], className)}
            {...restProps}
          />
          <MFlex direction="column" align="start">
            {label}
            <div className={footerClassName}>
              {description && (
                <MFieldDescription status={status}>
                  {description}
                </MFieldDescription>
              )}
            </div>
          </MFlex>
        </MFlex>
      </MLabel>
    </MFlex>
  );
};

export default MRadio;

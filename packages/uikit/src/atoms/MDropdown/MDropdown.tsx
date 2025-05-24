'use client';

import type React from 'react';
import {type 
  DetailedHTMLProps,type 
  HTMLAttributes,type 
  ReactNode,
  useCallback,
  useEffect,
} from 'react'
import MCard from '../MCard/MCard';
import clsx from 'clsx';
import styles from './MDropdown.module.css';

export type MDropdownProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  open: boolean;
  onClose?: () => void;
  dropdownContent: ReactNode;
  position?: 'top' | 'bottom';
  align?: 'left' | 'right';
  stretch: boolean;
  noPadding?: boolean;
  dropdownContentClassName?: string;
};

export const MDropdown = ({
  children,
  open,
  onClose = () => {},
  position = 'bottom',
  align = 'left',
  stretch = false,
  dropdownContent,
  className,
  noPadding = false,
  dropdownContentClassName,
  ...props
}: MDropdownProps) => {
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (open) {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.dropdown}`)) {
        onClose();
      }
    }
  }, [onClose, open]);

  const handleClickInside = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open, handleClickOutside]);

  return (
    <div
      className={clsx(styles.dropdownContainer)}
      {...props}
      onClick={handleClickInside}
    >
      {children}
      <div
        className={clsx(styles.dropdown, { [styles.open]: open }, [
          styles[position],
          styles[align],
        ])}
      >
        <MCard
          noPadding={noPadding}
          className={clsx(
            { [styles.stretch]: stretch },
            dropdownContentClassName
          )}
        >
          {dropdownContent}
        </MCard>
      </div>
    </div>
  );
};

export default MDropdown;

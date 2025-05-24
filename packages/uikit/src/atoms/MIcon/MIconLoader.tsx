import React, { Suspense } from 'react';
import type { MIconProps } from './types';
import * as Icons from './index';

type MIconLoaderProps = MIconProps & {
  name: string;
};

export const MIconLoader = ({ name, ...restProps }: MIconLoaderProps) => {
  const LazyComponent = Icons[name];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...restProps} />
    </Suspense>
  );
};

export default MIconLoader;

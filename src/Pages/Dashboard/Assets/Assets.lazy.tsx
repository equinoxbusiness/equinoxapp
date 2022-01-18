import React, { lazy, Suspense } from 'react';

const LazyAssets = lazy(() => import('./Assets'));

const Assets = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAssets {...props} />
  </Suspense>
);

export default Assets;

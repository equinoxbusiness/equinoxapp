import React, { lazy, Suspense } from 'react';

const LazyAssetsMain = lazy(() => import('./AssetsMain'));

const AssetsMain = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAssetsMain {...props} />
  </Suspense>
);

export default AssetsMain;

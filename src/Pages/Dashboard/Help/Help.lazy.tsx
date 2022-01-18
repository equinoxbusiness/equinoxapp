import React, { lazy, Suspense } from 'react';

const LazyHelp = lazy(() => import('./Help'));

const Help = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyHelp {...props} />
  </Suspense>
);

export default Help;

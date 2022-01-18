import React, { lazy, Suspense } from 'react';

const LazyGovernance = lazy(() => import('./Governance'));

const Governance = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyGovernance {...props} />
  </Suspense>
);

export default Governance;

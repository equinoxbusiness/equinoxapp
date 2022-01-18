import React, { lazy, Suspense } from 'react';

const LazyDashboardHeader = lazy(() => import('./DashboardHeader'));

const DashboardHeader = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDashboardHeader {...props} />
  </Suspense>
);

export default DashboardHeader;

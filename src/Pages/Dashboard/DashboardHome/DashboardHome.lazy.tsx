import React, { lazy, Suspense } from 'react';

const LazyDashboardHome = lazy(() => import('./DashboardHome'));

const DashboardHome = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDashboardHome {...props} />
  </Suspense>
);

export default DashboardHome;

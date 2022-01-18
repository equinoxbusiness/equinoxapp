import React, { lazy, Suspense } from 'react';

const LazyAllProjects = lazy(() => import('./AllProjects'));

const AllProjects = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAllProjects {...props} />
  </Suspense>
);

export default AllProjects;
